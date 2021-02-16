import React from 'react';
// Rail zone svg component
import Map from '../Map/Map';
import Tray from '../../shared/Tray/Tray';

import s from './MapView.module.scss';

const MapView = () => {
  return (
    <div className="bg-white">
      <div className={`${s.container} wmnds-grid wmnds-grid--spacing-md-2-lg`}>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-1-3">
          <Tray />
        </div>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-2-3">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default MapView;
