import { useContext } from 'react';
import { ALIGN_COVER, ALIGN_CENTER } from 'react-svg-pan-zoom';
// Import contexts
import { MapContext } from 'globalState';

const useMapControls = () => {
  const [mapState, mapDispatch] = useContext(MapContext);
  const { mapRef } = mapState;
  // Map transform/navigation functions
  const fitToViewer = () => mapRef.current.fitToViewer(ALIGN_COVER, ALIGN_CENTER);
  const zoomInCenter = () => mapRef.current.zoomOnViewerCenter(1.2);
  const zoomOutCenter = () => mapRef.current.zoomOnViewerCenter(0.9);
  const zoomSelection = (coords) => {
    const { x, y, width, height } = coords;
    mapRef.current.fitSelection(x, y, width, height);
  };
  const fitZoneToViewer = (zone) => {
    const svg = mapRef.current.ViewerDOM; // Find svg node
    const zoneNode = svg.querySelector(`#Zone_${zone}`); // Find relevant zone node
    const transitionElement = svg.childNodes[1]; // Get the element of the map which is transformed (to add a transition)
    // Add a transition to smooth zoom effect
    transitionElement.style.transition = 'transform 0.2s ease-out';
    // Remove transition on end to help performance
    transitionElement.ontransitionend = () => {
      transitionElement.style.transition = 'none';
    };

    if (zoneNode) {
      // Get coordinates for zone
      const zoneCoords = zoneNode.getBBox();
      // zoom in to fit zone coordinates to map
      zoomSelection(zoneCoords);
      // zoom out slightly afterwards
      setTimeout(() => {
        zoomOutCenter();
      }, 0);
    }
  };

  // useEffect(() => {
  //   if (mapRef?.current) {
  //
  //     const zones = mapState.highlightedZones;
  //     const zoneName =
  //       Object.keys(zones)
  //         .reverse()
  //         .find((item) => zones[item] === true) || null;
  //     if (zoneName) {
  //       const zoneToHighlight = zoneName.replace('zone', '');
  //       if (zoneToHighlight && zoneToHighlight <= '5') {
  //         fitZoneToViewer(zoneToHighlight);
  //       }
  //     }
  //   }
  // }, [mapRef, mapState.highlightedZones]);

  // Removes a specific station highlight on the map
  const resetMapStation = (station, selectedStations) => {
    if (mapRef?.current) {
      const svg = mapRef.current.ViewerDOM; // Find svg node
      // Find related group in svg map
      if (station && station.stationName) {
        // Find svg <g> related to station name
        const svgGroup =
          svg.querySelector(`[data-name="${station.stationName}"]`) ||
          svg.querySelector(`#${station.stationName.replace(' ', '_').replace(/[^\w-]+/g, '')}`); // regex removes whitespace and non word chars for id search

        // If group is found remove text background from svg map
        if (svgGroup) {
          svgGroup.removeChild(svgGroup.querySelector(`#${station.id}_text_bg`));

          // Find related zone in svg map
          const inThisZone = selectedStations.filter((item) => item.railZone === station.railZone);

          // If this is the only one of thiszone in selected stations then remove the highlight class from svg map
          if (inThisZone.length < 2) {
            mapDispatch({
              type: 'UPDATE_ZONE_HIGHLIGHT',
              payload: { [`zone${station.railZone}`]: false },
            });
          }
        }
      }
    }
  };
  // Clear all map highlights
  const resetMap = (selectedStations) => {
    if (mapRef?.current) {
      const svg = mapRef.current.ViewerDOM;
      // clear map highlights
      selectedStations.forEach((station) => {
        const textBg = svg.querySelector(`#${station.id}_text_bg`);
        const parkingIconBg = svg.querySelector(`#${station.id}_parking_bg`);
        if (textBg) {
          // remove background from text
          textBg.parentNode.removeChild(textBg);
        }
        if (parkingIconBg) {
          // remove background from parking icons
          parkingIconBg.parentNode.removeChild(parkingIconBg);
        }
      });
      mapDispatch({ type: 'CLEAR_HIGHLIGHTED_ZONES' });
    }
  };

  return {
    mapState,
    mapDispatch,
    resetMap,
    resetMapStation,
    fitToViewer,
    fitZoneToViewer,
    zoomInCenter,
    zoomOutCenter,
    zoomSelection,
  };
};

export default useMapControls;
