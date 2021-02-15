import { useContext, useEffect } from 'react';
import { ALIGN_COVER, ALIGN_CENTER } from 'react-svg-pan-zoom';
// Import contexts
import { MapContext } from 'globalState';

const useMapMethods = () => {
  const [mapState, mapDispatch] = useContext(MapContext);
  const { mapRef, mapContainer } = mapState;

  const fitToViewer = () => mapRef.current.fitToViewer(ALIGN_COVER, ALIGN_CENTER);
  const zoomInCenter = () => mapRef.current.zoomOnViewerCenter(1.2);
  const zoomOutCenter = () => mapRef.current.zoomOnViewerCenter(0.8);

  useEffect(() => {
    if (mapRef && mapContainer) {
      let mounted = true;

      const updateWidthHeight = () => {
        if (mounted) {
          const containerSize = mapContainer.current.getBoundingClientRect();

          mapDispatch({
            type: 'UPDATE_MAP_SIZE',
            payload: { width: containerSize.width, height: containerSize.width },
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

  const setMapSize = () => {
    const payload = {};
    mapDispatch({
      type: 'UPDATE_MAP_SIZE',
      payload,
    });
  };

  return { setMapSize, mapState, mapDispatch, fitToViewer, zoomInCenter, zoomOutCenter };
};

export default useMapMethods;
