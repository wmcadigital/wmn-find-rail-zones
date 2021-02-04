import React, { useContext } from 'react';
import Icon from '../shared/Icon/Icon';
import AccessIcon from '../shared/Icon/AccessIcon';
import s from './RailZoneFinder.module.scss';
import { AutoCompleteContext } from 'globalState';
import railData from './RailData.json';

const Result = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;

  let stations = selectedStations.map((station) => {
    if (station.id) {
      const stationData = railData.railStationAccess.find((item) => station.id === item.crsCode);
      const zone = stationData.railZone ? `Zone ${stationData.railZone}` : 'Out of County';
      return {
        station: station.stopName,
        zone: zone,
        stepFreeAccess: stationData.stepFreeAccess,
        parking: stationData.parking,
      };
    } else {
      return null;
    }
  });

  stations = stations.filter((item) => item !== null);

  const fullAccessStations = stations
    .filter((item) => item.stepFreeAccess === 'full')
    .map((item) => item.station);
  const partAccessStations = stations
    .filter((item) => item.stepFreeAccess === 'partial')
    .map((item) => item.station);
  const parkingStations = stations.filter((item) => item.parking).map((item) => item.station);
  const arrayToSentence = (array) => {
    if (array.length > 2) {
      return `${array.slice(0, array.length - 1).join(', ')} and ${array.slice(-1)}`;
    } else if (array.length === 2) {
      return `${array[0]} and ${array[1]}`;
    } else {
      return array[0];
    }
  };
  return (
    <div>
      {stations.map(({ station, zone }, i) => (
        <p key={i}>
          {station} is {zone !== 'Out of County' && 'in '}
          <strong>{zone}</strong>.
        </p>
      ))}
      {fullAccessStations.length > 0 && (
        <div className={`${s.nowrap} wmnds-grid wmnds-grid--spacing-2-sm`}>
          <div className="wmnds-col-auto">
            <AccessIcon type="full" />
          </div>
          <div className="wmnds-col-auto">
            <p>Full step-free access is available at {arrayToSentence(fullAccessStations)}.</p>
          </div>
        </div>
      )}
      {partAccessStations.length > 0 && (
        <div className={`${s.nowrap} wmnds-grid wmnds-grid--spacing-2-sm`}>
          <div className="wmnds-col-auto">
            <AccessIcon type="part" />
          </div>
          <div className="wmnds-col-auto">
            <p>Partial step-free access is available at {arrayToSentence(partAccessStations)}.</p>
          </div>
        </div>
      )}
      {parkingStations.length > 0 && (
        <div className={`${s.nowrap} wmnds-grid wmnds-grid--spacing-2-sm`}>
          <div className="wmnds-col-auto">
            <Icon iconName="general-parking" size={20} color="cta" />
          </div>
          <div className="wmnds-col-auto">
            <p>Parking is available at {arrayToSentence(parkingStations)}.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
