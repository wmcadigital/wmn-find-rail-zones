import React, { useContext, useState, useEffect, useRef } from 'react';
import RailZoneMap from './RailZoneMap';
import Icon from '../../shared/Icon/Icon';
import AccessIcon from '../../shared/Icon/AccessIcon';
import Button from '../../shared/Button/Button';

import s from './Map.module.scss';

import { MapContext } from 'globalState';

const Map = () => {
  const [, mapDispatch] = useContext(MapContext);
  const [showKey, setShowKey] = useState(false);
  const mapContainer = useRef(null);

  useEffect(() => {
    mapDispatch({
      type: 'ADD_MAP_CONTAINER',
      payload: mapContainer,
    });
  }, [mapDispatch, mapContainer]);

  return (
    <div className={s.mapContainer} ref={mapContainer}>
      <RailZoneMap />
      {!showKey ? (
        <Button
          btnClass={`wmnds-btn--primary ${s.showKeyBtn}`}
          text="Show key"
          iconRight="general-chevron-right"
          onClick={() => setShowKey(true)}
        />
      ) : (
        <div className={`wmnds-p-md bg-white ${s.accessMenu}`}>
          <div className="wmnds-grid wmnds-grid--justify-between">
            <h3 className="wmnds-col-auto">Show key</h3>
            <div className="wmnds-col-auto">
              <Button
                btnClass={`wmnds-btn--link ${s.hideKeyBtn}`}
                text="Hide"
                iconRight="general-chevron-right"
                onClick={() => setShowKey(false)}
              />
            </div>
          </div>
          <div className={`${s.keyIcon}`}>
            <AccessIcon type="full" className="wmnds-m-r-sm" /> Stations with full step-free access
          </div>
          <div className={`${s.keyIcon}`}>
            <AccessIcon type="part" className="wmnds-m-r-sm" /> Stations with part step-free access
          </div>
          <div className={`${s.keyIcon}`}>
            <Icon iconName="general-parking" className="wmnds-m-r-sm" color="cta" /> Stations with
            parking
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
