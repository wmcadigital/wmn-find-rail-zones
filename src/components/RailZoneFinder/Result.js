import React, { useContext } from 'react';
import Icon from '../shared/Icon/Icon';
import AccessIcon from '../shared/Icon/AccessIcon';
import s from './RailZoneFinder.module.scss';
import { AutoCompleteContext } from 'globalState';

const Result = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;

  const stations = selectedStations.filter((item) => item.id !== null);

  const fullAccessStations = stations
    .filter((item) => item.stepFreeAccess === 'full')
    .map((item) => item.stationName);
  const partAccessStations = stations
    .filter((item) => item.stepFreeAccess === 'partial')
    .map((item) => item.stationName);
  const parkingStations = stations.filter((item) => item.parking).map((item) => item.stationName);
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
      {stations.map(({ stationName, railZone }, i) => (
        <p key={i}>
          {stationName} is{' '}
          {railZone ? (
            <>
              in <strong>Zone {railZone}</strong>
            </>
          ) : (
            <strong>Out of County</strong>
          )}
          .
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
