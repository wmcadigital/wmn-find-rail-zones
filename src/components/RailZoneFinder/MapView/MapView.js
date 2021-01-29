import React from 'react';
// Rail zone svg component
import RailZoneMap from '../RailZoneMap';
import Search from '../Search';

import s from './MapView.module.scss';

const MapView = () => {
  return (
    <div className="bg-white wmnds-p-md">
      <div className={`${s.container} wmnds-grid wmnds-grid--spacing-md-2-lg`}>
        <div className="wmnds-col-1-3">
          <Search />
        </div>
        <div className="wmnds-col-2-3">
          <RailZoneMap />
        </div>
      </div>
    </div>
  );
};

export default MapView;
