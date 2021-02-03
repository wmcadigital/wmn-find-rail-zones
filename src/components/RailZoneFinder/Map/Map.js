import React, { useContext, useState, createRef } from 'react';
import RailZoneMap from './RailZoneMap';
import Icon from '../../shared/Icon/Icon';
import AccessIcon from '../../shared/Icon/AccessIcon';
import Button from '../../shared/Button/Button';
import Checkbox from '../../shared/Checkbox/Checkbox';

import s from './Map.module.scss';

import { AutoCompleteContext } from 'globalState';

const Map = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [showKey, setShowKey] = useState(false);
  const { selectedStations } = autoCompleteState;
  const mapRef = createRef();

  React.useEffect(() => {
    const stations = selectedStations.filter((station) => station.stopName);

    stations.forEach((station) => {
      const group =
        mapRef.current.querySelector(`[data-name="${station.stopName}"]`) ||
        mapRef.current.querySelector(`#${station.stopName}`);

      if (!group.querySelector(`.${s.textBg}`)) {
        const gCoords = group.getBBox();

        const p = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        p.setAttribute('class', s.textBg);
        p.setAttribute('y', gCoords.y - 4);
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
  }, [mapRef, selectedStations]);

  return (
    <div className={s.mapContainer}>
      <RailZoneMap mapRef={mapRef} />
      {!showKey ? (
        <Button
          btnClass={`wmnds-btn--primary ${s.showKeyBtn}`}
          text="Show parking and accessibility"
          iconRight="general-chevron-right"
          onClick={() => setShowKey(true)}
        />
      ) : (
        <div className={`wmnds-p-md bg-white ${s.accessMenu}`}>
          <div className="wmnds-grid wmnds-grid--justify-between">
            <h3 className="wmnds-col-auto">Show parking and accessibility</h3>
            <div className="wmnds-col-auto">
              <Button
                btnClass={`wmnds-btn--link ${s.hideKeyBtn}`}
                text="Hide"
                iconRight="general-chevron-right"
                onClick={() => setShowKey(false)}
              />
            </div>
          </div>
          <Checkbox classes="wmnds-m-b-sm">
            <div style={{ display: 'flex' }}>
              <AccessIcon type="full" className="wmnds-m-r-sm" /> Stations with full step-free
              access
            </div>
          </Checkbox>
          <Checkbox classes="wmnds-m-b-sm">
            <div style={{ display: 'flex' }}>
              <AccessIcon type="part" className="wmnds-m-r-sm" /> Stations with part step-free
              access
            </div>
          </Checkbox>
          <Checkbox classes="wmnds-m-b-sm">
            <div style={{ display: 'flex' }}>
              <Icon iconName="general-parking" className="wmnds-m-r-sm" color="cta" /> Stations with
              parking
            </div>
          </Checkbox>
        </div>
      )}
    </div>
  );
};

export default Map;
