import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import AccessIcon from '../Icon/AccessIcon';
import Button from '../Button/Button';

import s from './AccessibilityKey.module.scss';

const AccessibilityKey = ({ mapKey }) => {
  const [showKey, setShowKey] = useState(mapKey ? false : true);

  const Key = (
    <>
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
    </>
  );

  return mapKey ? (
    <div class={s.mapKeyContainer}>
      {!showKey ? (
        <Button
          btnClass={`wmnds-btn--primary ${s.showKeyBtn}`}
          text="Show key"
          iconRight="general-chevron-right"
          onClick={() => setShowKey(true)}
        />
      ) : (
        <div className={`wmnds-p-md bg-white ${s.accessMenu} ${s.mapKey}`}>
          <div className="wmnds-grid wmnds-grid--justify-between">
            <h3 className="wmnds-col-auto">Key</h3>
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
  mapKey: PropTypes.bool,
};

AccessibilityKey.defaultProps = {
  mapKey: false,
};

export default AccessibilityKey;
