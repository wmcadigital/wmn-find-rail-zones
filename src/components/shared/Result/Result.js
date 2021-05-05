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
  const { selectedStations, ticketMode } = autoCompleteState;

  // Get selected stations that have an id
  const stations = selectedStations.filter((item) => item.id !== null);

  const zones = [...stations.map((stn) => stn.railZone)];
  const minZone = Math.min(...zones);
  const maxZone = Math.max(...zones);

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
      {stations.length > 0 && (
        <>
          <div className="wmnds-m-b-lg">
            {stations.map(({ id, stationName, railZone }, i) => (
              <p
                key={id}
                className={
                  stations.length === i + 1 && stations.length === 1 ? 'wmnds-m-b-none' : ''
                }
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
          </div>
          {stations.length > 1 && ticketMode && (
            <div className={`wmnds-m-b-lg wmnds-p-md ${s.bgSecondary}`}>
              <p className={minZone >= 2 ? '' : 'wmnds-m-b-none'}>
                To travel between these stations, you&rsquo;ll need a{' '}
                <strong>zone 1 to {maxZone > 5 ? 5 : maxZone}</strong> ticket.
              </p>
              {minZone >= 2 && (
                <p className="wmnds-m-b-none">
                  If you do not need to travel through Birmingham City Centre, you can get a{' '}
                  <strong>zone 2 to 5</strong> ticket.
                </p>
              )}
            </div>
          )}
        </>
      )}
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
