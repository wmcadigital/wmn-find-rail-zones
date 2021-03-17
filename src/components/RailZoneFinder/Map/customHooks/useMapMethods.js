import { useContext, useEffect, useLayoutEffect } from 'react';
// import { ALIGN_COVER, ALIGN_CENTER } from 'react-svg-pan-zoom';
// Import contexts
import { AutoCompleteContext, MapContext } from 'globalState';
import s from '../Map.module.scss';

const useMapMethods = () => {
  const [mapState, mapDispatch] = useContext(MapContext);
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { mapRef, mapContainer } = mapState;

  useEffect(() => {
    // Check if map and mapcontainer refs exist
    let mounted = true;

    // Get map container dimensions and assign them to the svg map whidth/height
    const updateWidthHeight = () => {
      if (mounted) {
        const containerSize = mapContainer.current.getBoundingClientRect();
        // Add map size to context state
        mapDispatch({
          type: 'UPDATE_MAP_SIZE',
          payload: {
            width: containerSize.width,
            height: containerSize.height,
          },
        });
      }
    };
    if (mapRef?.current && mapContainer?.current) {
      // Run map resize on initial render
      updateWidthHeight();

      // Run map resize when the window is resized
      window.addEventListener('resize', () => {
        updateWidthHeight();
      });
    }
    // Cleanup: remove eventListener
    return () => {
      mounted = false;
      window.removeEventListener('resize', updateWidthHeight);
    };
  }, [mapRef, mapContainer, mapDispatch]);

  useLayoutEffect(() => {
    // Function for hightlighting stations on the svg map
    const drawMapHighlights = (station) => {
      const svg = mapRef.current.ViewerDOM;
      // Find station element by name or id
      const group =
        svg.querySelector(`[data-name="${station.stationName}"]`) ||
        svg.querySelector(`#${station.stationName.replace(' ', '_').replace(/[^\w-]+/g, '')}`);

      if (group && !group.querySelector(`.${s.textBg}`)) {
        group.classList.add(s.selectedStation);
        // Find parking icon for that station if there is one
        const parkingIcon = group.querySelector(`.parking-icon`);
        // If the group element exists get its svg coordinates
        const gCoords = group.getBBox();
        // Create a new rectangle element
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        // Set attributes and positioning on the new rect element using coordinates
        p.setAttribute('id', `${station.id}_text_bg`); // set id
        p.setAttribute('class', s.textBg); // set class
        p.setAttribute('y', gCoords.y - 2.25); // set y position (offset slightly for better position)
        p.setAttribute('x', gCoords.x - 4); // set x position (offset slightly for better position)
        p.setAttribute('rx', 3); // set border radius x
        p.setAttribute('ry', 3); // set border radius y
        p.setAttribute('width', gCoords.width + 8); // set width to group width + padding
        p.setAttribute('height', gCoords.height + 4); // set height to group height + padding
        p.setAttribute('stroke', '#fff'); // add a white stroke
        p.setAttribute('stroke-width', '1'); // set stroke width
        p.setAttribute('fill', '#3c1053'); // set fill colour (WMN primary purple)
        // Insert the new <rect> inside the group element
        group.insertBefore(p, group.childNodes[0]);
        // Add background to parking icon if present
        if (parkingIcon) {
          // If the parking icon element exists get its svg coordinates
          const pIconCoords = parkingIcon.getBBox();
          // Create a new rectangle element
          const i = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          i.setAttribute('id', `${station.id}_parking_bg`); // set id
          i.setAttribute('x', pIconCoords.x - 1); // set x position
          i.setAttribute('y', pIconCoords.y - 1 + 38.73); // set y position. 38.73 offsets transform translate in svg
          i.setAttribute('rx', 1.5); // set border radius x
          i.setAttribute('ry', 1.5); // set border radius y
          i.setAttribute('width', pIconCoords.width + 2); // set width to group width + padding
          i.setAttribute('height', pIconCoords.height + 2); // set height to group height + padding
          i.setAttribute('fill', '#fff'); // set fill colour to white
          // Insert the new <rect> inside the group element behind parking icon
          group.insertBefore(i, group.childNodes[2]);
        }
      }
    };

    if (mapRef?.current) {
      // Loop through selected stations and highlight them on the map
      autoCompleteState.selectedStations.forEach((station) => {
        if (station.stationName) {
          drawMapHighlights(station);
        }
      });
    }
  }, [mapRef, autoCompleteState]);

  return {
    mapState,
    mapDispatch,
  };
};

export default useMapMethods;
