import React from 'react';

import Icon from '../shared/Icon/Icon';
import AccessIcon from '../shared/Icon/AccessIcon';
import s from './RailZoneFinder.module.scss';

const results = [
  { station: 'Birmingham New Street', zone: 'Zone 1', stepAccess: true, parking: true },
  { station: 'Worcester Forgate Street', zone: 'Out of County', stepAccess: true, parking: false },
];

const Result = () => {
  return (
    <div>
      {results.map(({ station, zone }) => (
        <p>
          {station} is {zone !== 'Out of County' && 'in '}
          <strong>{zone}</strong>.
        </p>
      ))}
      <div className={`${s.nowrap} wmnds-grid wmnds-grid--spacing-2-sm`}>
        <div className="wmnds-col-auto">
          <AccessIcon type="full" />
        </div>
        <div className="wmnds-col-auto">
          <p>
            Full step-free access is available at Birmingham New Street and Worcester Forgate
            Street.
          </p>
        </div>
      </div>
      <div className={`${s.nowrap} wmnds-grid wmnds-grid--spacing-2-sm`}>
        <div className="wmnds-col-auto">
          <Icon iconName="general-parking" size={20} color="cta" />
        </div>
        <div className="wmnds-col-auto">
          <p>Parking is available at Birmingham New Street.</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
