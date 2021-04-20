import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
// Import styles
import s from './TrainAutoCompleteResult.module.scss';

const TrainAutoCompleteResult = (props) => {
  const { result, handleKeyDown, queryId } = props || {};
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext);

  // Set payload object to pass below
  const payload = {
    id: result.crsCode,
    queryId,
  };

  const addSelectedStation = () => {
    //  Update normal selectedStation
    autoCompleteDispatch({
      type: 'UPDATE_SELECTED_STATION',
      payload,
    });
  };

  return (
    <li
      className="wmnds-autocomplete-suggestions__li"
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => addSelectedStation()}
    >
      {/* Right section */}
      <strong className={`${s.routeName}`}>{result.stationName}</strong>
    </li>
  );
};

export default TrainAutoCompleteResult;
