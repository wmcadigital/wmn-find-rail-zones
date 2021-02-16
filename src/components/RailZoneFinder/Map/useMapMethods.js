import { useContext, useLayoutEffect } from 'react';
import { ALIGN_COVER, ALIGN_CENTER } from 'react-svg-pan-zoom';
// Import contexts
import { AutoCompleteContext, MapContext } from 'globalState';
import s from './Map.module.scss';

const useMapMethods = () => {
  const [mapState, mapDispatch] = useContext(MapContext);
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { mapRef, mapContainer } = mapState;

  useLayoutEffect(() => {
    if (mapRef?.current && mapContainer?.current) {
      let mounted = true;

      const updateWidthHeight = () => {
        if (mounted) {
          const containerSize = mapContainer.current.getBoundingClientRect();

          mapDispatch({
            type: 'UPDATE_MAP_SIZE',
            payload: {
              width: containerSize.width,
              height: containerSize.height,
            },
          });
        }
      };

      updateWidthHeight();

      window.addEventListener('resize', () => {
        updateWidthHeight();
        mapRef.current.fitToViewer(ALIGN_COVER, ALIGN_CENTER);
      });
      // Cleanup: remove eventListener
      return () => {
        mounted = false;
        window.removeEventListener('resize', updateWidthHeight);
      };
    }
  }, [mapRef, mapContainer, mapDispatch]);

  useLayoutEffect(() => {
    const drawMapHighlights = (station) => {
      const svg = mapRef.current.ViewerDOM;

      const group =
        svg.querySelector(`[data-name="${station.stationName}"]`) ||
        svg.querySelector(`#${station.stationName.replace(' ', '_').replace(/[^\w-]+/g, '')}`);

      const zone = svg.querySelector(`#Zone_${station.railZone}`);
      const parkingIcon = group.querySelector(`.parking-icon`);

      if (zone) {
        zone.classList.add(s.zoneSelected);
      }

      if (group && !group.querySelector(`.${s.textBg}`)) {
        const gCoords = group.getBBox();

        const p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        p.setAttribute('id', `${station.id}_text_bg`);
        p.setAttribute('class', s.textBg);
        p.setAttribute('y', gCoords.y - 2.25);
        p.setAttribute('x', gCoords.x - 4);
        p.setAttribute('rx', 3);
        p.setAttribute('ry', 3);
        p.setAttribute('width', gCoords.width + 8);
        p.setAttribute('height', gCoords.height + 4);
        p.setAttribute('stroke', '#fff');
        p.setAttribute('stroke-width', '1');
        p.setAttribute('fill', '#3c1053');
        group.insertBefore(p, group.childNodes[0]);
        // Add background to parking icon if present
        if (parkingIcon) {
          const pIconCoords = parkingIcon.getBBox();
          const i = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          i.setAttribute('id', `${station.id}_parking_bg`);
          i.setAttribute('y', pIconCoords.y - 1 + 38.73); // 38.73 offsets transform translate in svg
          i.setAttribute('x', pIconCoords.x - 1);
          i.setAttribute('rx', 1.5);
          i.setAttribute('ry', 1.5);
          i.setAttribute('width', pIconCoords.width + 2);
          i.setAttribute('height', pIconCoords.height + 2);
          i.setAttribute('fill', '#fff');
          group.insertBefore(i, group.childNodes[2]);
        }
      }
    };

    if (mapRef?.current) {
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
