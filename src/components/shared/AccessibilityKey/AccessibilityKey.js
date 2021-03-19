import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';
import { MapContext } from 'globalState';

import Icon from '../Icon/Icon';
import AccessIcon from '../Icon/AccessIcon';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

import s from './AccessibilityKey.module.scss';

const AccessibilityKey = ({ mapView }) => {
  const [mapState, mapDispatch] = useContext(MapContext);
  const [showKey, setShowKey] = useState(!mapView);

  const showStations = (type) => {
    mapDispatch({
      type: 'TOGGLE_ACCESS_VISIBILITY',
      payload: { ...mapState.accessVisibility, [type]: !mapState.accessVisibility[type] },
    });
  };

  const Key = (
    <>
      <div className={`${s.keyIcon}`}>
        {mapView ? (
          <Checkbox
            classes="wmnds-m-none"
            handleChange={() => showStations('full')}
            name="access_toggle"
            checked={mapState.accessVisibility.full}
          >
            <AccessIcon type="full" className="wmnds-m-r-sm" /> Stations with full step-free access
          </Checkbox>
        ) : (
          <>
            <AccessIcon type="full" className="wmnds-m-r-sm" /> Stations with full step-free access
          </>
        )}
      </div>
      <div className={`${s.keyIcon}`}>
        {mapView ? (
          <Checkbox
            classes="wmnds-m-none"
            handleChange={() => showStations('partial')}
            name="access_toggle"
            checked={mapState.accessVisibility.partial}
          >
            <AccessIcon type="part" className="wmnds-m-r-sm" /> Stations with part step-free access
          </Checkbox>
        ) : (
          <>
            <AccessIcon type="part" className="wmnds-m-r-sm" /> Stations with part step-free access
          </>
        )}
      </div>
      <div className={`${s.keyIcon}`}>
        {mapView ? (
          <Checkbox
            classes="wmnds-m-none"
            handleChange={() => showStations('parking')}
            name="access_toggle"
            checked={mapState.accessVisibility.parking}
          >
            <Icon iconName="general-parking" className="wmnds-m-r-sm" color="cta" /> Stations with
            parking
          </Checkbox>
        ) : (
          <>
            <Icon iconName="general-parking" className="wmnds-m-r-sm" color="cta" /> Stations with
            parking
          </>
        )}
      </div>
    </>
  );

  return mapView ? (
    <div className={s.mapKeyContainer}>
      {!showKey ? (
        <Button
          btnClass={`wmnds-btn--primary ${s.showKeyBtn}`}
          text="Show parking and accessibility"
          iconRight="general-chevron-right"
          onClick={() => setShowKey(true)}
        />
      ) : (
        <div className={`wmnds-p-md bg-white ${s.accessMenu} ${s.mapKey}`}>
          <div className={`wmnds-grid wmnds-grid--justify-between ${s.keyHeader}`}>
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
          {Key}
        </div>
      )}
    </div>
  ) : (
    <div className={`wmnds-p-md bg-white ${s.accessMenu}`}>
      <div className="wmnds-grid wmnds-grid--justify-between">
        <h3 className={`h2 wmnds-col-auto ${!showKey && 'wmnds-m-b-none'}`}>Key</h3>
        <div className="wmnds-col-auto">
          <Button
            btnClass={`wmnds-btn--link ${s.hideKeyBtn}`}
            text={showKey ? 'Hide' : 'Show'}
            onClick={() => setShowKey(!showKey)}
          />
        </div>
      </div>
      {showKey && Key}
    </div>
  );
};

AccessibilityKey.propTypes = {
  mapView: PropTypes.bool,
};

AccessibilityKey.defaultProps = {
  mapView: false,
};

export default AccessibilityKey;
