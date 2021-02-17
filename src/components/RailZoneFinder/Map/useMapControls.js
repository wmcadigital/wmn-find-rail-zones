import { useContext, useEffect } from 'react';
import { ALIGN_COVER, ALIGN_CENTER } from 'react-svg-pan-zoom';
// Import contexts
import { MapContext } from 'globalState';

const useMapControls = () => {
  const [mapState, mapDispatch] = useContext(MapContext);

  const { mapRef } = mapState;

  const fitToViewer = () => mapRef.current.fitToViewer(ALIGN_COVER, ALIGN_CENTER);
  const zoomInCenter = () => mapRef.current.zoomOnViewerCenter(1.2);
  const zoomOutCenter = () => mapRef.current.zoomOnViewerCenter(0.8);
  const zoomSelection = (coords) => {
    const { x, y, width, height } = coords;
    mapRef.current.fitSelection(x, y, width, height);
  };

  const fitZoneToViewer = (zone) => {
    if (mapRef?.current) {
      const svg = mapRef.current.ViewerDOM;
      const zoneNode = svg.querySelector(`#Zone_${zone}`);
      const element = svg.childNodes[1];

      element.style.transition = 'transform 0.2s ease-out';
      element.ontransitionend = () => {
        element.style.transition = 'none';
      };
      if (zoneNode) {
        const zoneCoords = zoneNode.getBBox();

        zoomSelection({
          x: zoneCoords.x,
          y: zoneCoords.y,
          width: zoneCoords.width,
          height: zoneCoords.height,
        });
        setTimeout(() => {
          zoomOutCenter();
        }, 0);
      }
    }
  };

  const resetMapStation = (station, selectedStations) => {
    if (mapRef?.current) {
      const svg = mapRef.current.ViewerDOM;
      // Find related group in svg map
      if (station && station.stationName) {
        const svgGroup =
          svg.querySelector(`[data-name="${station.stationName}"]`) ||
          svg.querySelector(`#${station.stationName.replace(' ', '_').replace(/[^\w-]+/g, '')}`);

        // If group found remove text background from svg map
        if (svgGroup) {
          svgGroup.removeChild(svgGroup.querySelector(`#${station.id}_text_bg`));

          // Find related zone in svg map
          const inThisZone = selectedStations.filter((item) => item.railZone === station.railZone);

          // If this is the only one of thiszone in selected stations then remove the highlight class from svg map
          if (inThisZone.length < 2) {
            const zone = svg.querySelector(`#Zone_${station.railZone}`);

            if (zone) {
              zone.classList.remove(...zone.classList);
            }
          }
        }
      }
    }
  };

  const resetMap = (selectedStations) => {
    if (mapRef?.current) {
      const svg = mapRef.current.ViewerDOM;
      // clear map highlights
      selectedStations.forEach((station) => {
        const textBg = svg.querySelector(`#${station.id}_text_bg`);
        const parkingIconBg = svg.querySelector(`#${station.id}_parking_bg`);
        const zone = svg.querySelector(`#Zone_${station.railZone}`);
        if (textBg) {
          textBg.parentNode.removeChild(textBg);
        }
        if (parkingIconBg) {
          parkingIconBg.parentNode.removeChild(parkingIconBg);
        }
        if (zone) {
          zone.classList.remove(...zone.classList);
        }
      });
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
