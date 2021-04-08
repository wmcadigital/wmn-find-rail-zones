import React, { useContext } from 'react';
// Import contexts
import { AutoCompleteContext, FormContext } from 'globalState';
// Import components
import Icon from '../Icon/Icon';
import AccessIcon from '../Icon/AccessIcon';
// Import styles
import s from './Result.module.scss';

const Result = () => {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [formState] = useContext(FormContext);
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

  const ticketZone = () => {
    const zones = [...stations.map((stn) => stn.railZone)];
    const min = Math.min(...zones);
    const max = Math.max(...zones);

    let ticketType;
    if (min === 1 && max < 5) {
      ticketType = '1 to 4';
    } else if (min >= 2 && max < 5) {
      ticketType = '2 to 5';
    } else {
      ticketType = '1 to 5';
    }
    return ticketType;
  };

  return (
    <div>
      {stations.length > 0 && (
        <div className={`wmnds-m-b-lg ${formState.questionView ? 'wmnds-inset-text' : ''}`}>
          {stations.map(({ id, stationName, railZone }, i) => (
            <p
              key={id}
              className={stations.length === i + 1 && stations.length === 1 ? 'wmnds-m-b-none' : ''}
            >
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
          {stations.length > 1 && (
            <>
              <p className={ticketZone() !== '2 to 5' ? 'wmnds-m-b-none' : ''}>
                To travel between these stations, you&rsquo;ll need a{' '}
                <strong>zone {ticketZone()}</strong> ticket.
              </p>
              {ticketZone() === '2 to 5' && (
                <p className="wmnds-m-b-none">
                  If you need to travel through Birmingham City Centre, you will need a{' '}
                  <strong>zone 1 to 4</strong> ticket.
                </p>
              )}
            </>
          )}
        </div>
      )}
      {!formState.questionView && (
        <>
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
                <p>
                  Partial step-free access is available at {arrayToSentence(partAccessStations)}.
                </p>
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
        </>
      )}
    </div>
  );
};

export default Result;
