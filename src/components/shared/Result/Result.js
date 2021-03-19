import React, { useContext } from 'react';
// Import contexts
import { AutoCompleteContext } from 'globalState';
// Import components
import Icon from '../Icon/Icon';
import AccessIcon from '../Icon/AccessIcon';
// Import styles
import s from './Result.module.scss';

const Result = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const { selectedStations } = autoCompleteState;

  // Get selected stations that have an id
  const stations = selectedStations.filter((item) => item.id !== null);

  // Get stations with full access from selected stations
  const fullAccessStations = stations
    .filter((item) => item.stepFreeAccess === 'full')
    .map((item) => item.stationName);
  // Get stations with partial access from selected stations
  const partAccessStations = stations
    .filter((item) => item.stepFreeAccess === 'partial')
    .map((item) => item.stationName);
  // Get stations with parking from selected stations
  const parkingStations = stations.filter((item) => item.parking).map((item) => item.stationName);
  // Function to change arrays into readable sentence
  const arrayToSentence = (array) => {
    let sentence;
    if (array.length > 2) {
      sentence = `${array.slice(0, array.length - 1).join(', ')} and ${array.slice(-1)}`;
    } else if (array.length === 2) {
      sentence = `${array[0]} and ${array[1]}`;
    } else {
      [sentence] = array;
    }
    return sentence;
  };

  return (
    <div>
      {stations.map(({ id, stationName, railZone }) => (
        <p key={id}>
          {stationName} is{' '}
          {railZone < 6 && (
            <>
              in <strong>Zone {railZone}</strong>
            </>
          )}
          {railZone === 6 && (
            <>
              in <strong>nTrain Zone 5</strong>
            </>
          )}
          {railZone === 7 && <strong>Out of County</strong>}.
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
