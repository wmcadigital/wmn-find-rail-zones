import React, { useContext, useEffect, useRef } from 'react';
import RailZoneMap from './RailZoneMap';
import AccessibilityKey from '../../shared/AccessibilityKey/AccessibilityKey';

import s from './Map.module.scss';

import { MapContext } from 'globalState';

const Map = () => {
  const [, mapDispatch] = useContext(MapContext);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapDispatch({
      type: 'ADD_MAP_CONTAINER',
      payload: mapContainer,
    });
  }, [mapDispatch, mapContainer]);

  return (
    <div className={`${s.mapView}`}>
      <div className={s.mapContainer} ref={mapContainer}>
        <RailZoneMap />
        <AccessibilityKey mapView />
      </div>
    </div>
  );
};

export default Map;
