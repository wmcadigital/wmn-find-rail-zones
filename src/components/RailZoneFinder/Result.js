import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../shared/Icon/Icon';
import s from './RailZoneFinder.module.scss';

const results = [
  { station: 'Birmingham New Street', zone: 'Zone 1', stepAccess: true, parking: true },
  { station: 'Worcester Forgate Street', zone: 'Out of County', stepAccess: true, parking: false },
];

const AccessInfo = ({ iconName, children }) => {
  return (
    <div className={`${s.accessInfo} wmnds-grid`}>
      {iconName && (
        <div className="wmnds-col-auto">
          <Icon iconName={iconName} className={s.accessInfoIcon} />
        </div>
      )}
      <div className="wmnds-col-auto">{children}</div>
    </div>
  );
};

const Result = () => {
  return (
    <div>
      {results.map(({ station, zone }) => (
        <p>
          {station} is {zone !== 'Out of County' && 'in '}
          <strong>{zone}</strong>.
        </p>
      ))}
      <AccessInfo>
        <p>
          Full step-free access is available at Birmingham New Street and Worcester Forgate Street.
        </p>
      </AccessInfo>
      <AccessInfo iconName="general-parking">
        <p>Parking is available at Birmingham New Street.</p>
      </AccessInfo>
    </div>
  );
};

AccessInfo.propTypes = {
  iconName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

AccessInfo.defaultProps = {
  iconName: null,
  children: null,
};

export default Result;
