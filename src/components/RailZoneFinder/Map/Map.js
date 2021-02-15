import React, { useContext, useState, useEffect, useRef } from 'react';
import RailZoneMap from './RailZoneMap';
import Icon from '../../shared/Icon/Icon';
import AccessIcon from '../../shared/Icon/AccessIcon';
import Button from '../../shared/Button/Button';

import s from './Map.module.scss';

import { AutoCompleteContext, MapContext } from 'globalState';

const Map = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [, mapDispatch] = useContext(MapContext);
  const [showKey, setShowKey] = useState(false);
  const { selectedStations, mapRef } = autoCompleteState;
  const mapContainer = useRef(null);

  useEffect(() => {
    mapDispatch({
      type: 'ADD_MAP_CONTAINER',
      payload: mapContainer,
    });
  }, [mapDispatch, mapContainer]);

  useEffect(() => {
    const stations = selectedStations.filter((station) => station.stationName);
    if (mapRef?.current) {
      const svg = mapRef.current.ViewerDOM;

      stations.forEach((station) => {
        const group =
          svg.querySelector(`[data-name="${station.stationName}"]`) ||
          svg.querySelector(`#${station.stationName.replace(' ', '_').replace(/[^\w-]+/g, '')}`);

        const zone = svg.querySelector(`#Zone_${station.railZone}`);

        if (zone) {
          zone.classList.add(s.zoneSelected);
        }

        if (group && !group.querySelector(`.${s.textBg}`)) {
          const gCoords = group.getBBox();

          const p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          p.setAttribute('id', `${station.id}_text_bg`);
          p.setAttribute('class', s.textBg);
          p.setAttribute('y', gCoords.y - 4.5);
          p.setAttribute('x', gCoords.x - 4);
          p.setAttribute('rx', 4);
          p.setAttribute('ry', 4);
          p.setAttribute('width', gCoords.width + 8);
          p.setAttribute('height', gCoords.height + 8);
          p.setAttribute('stroke', '#fff');
          p.setAttribute('stroke-width', '1.5');
          p.setAttribute('fill', '#3c1053');
          group.insertBefore(p, group.childNodes[0]);
        }
      });
    }
  }, [mapRef, selectedStations]);

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
