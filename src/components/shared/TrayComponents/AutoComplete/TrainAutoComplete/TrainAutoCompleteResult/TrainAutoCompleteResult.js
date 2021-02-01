import React, { useContext } from 'react';
import { AutoCompleteContext } from 'globalState';
// Import styles
import s from './TrainAutoCompleteResult.module.scss';

const TrainAutoCompleteResult = (props) => {
  const { result, handleKeyDown, to } = props || {};

  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);

  // Set payload object to pass below
  const payload = {
    id: result.id,
    severity: result?.disruptionSeverity || 'success',
    stopName: result.name,
    lines: result.lines,
    to,
  };

  const updateSelectedService = () => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedItem.selectedByMap) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' });
    }

    //  Update normal selectedItem
    autoCompleteDispatch({
      type: 'UDPATE_SELECTED_ITEM',
      payload,
    });
  };

  // Return service with the above disruption logic, replace type and iconName with correct icon and class depending on disruption type
  return (
    <li
      className="wmnds-autocomplete-suggestions__li wmnds-grid"
      // title={`${text} on ${result.serviceNumber}`}
      tabIndex="0"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="button"
      aria-pressed="false"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={() => updateSelectedService()}
    >
      {/* Right section */}
      <strong className={`wmnds-col-auto ${s.routeName}`}>{result.name}</strong>
    </li>
  );
};

export default TrainAutoCompleteResult;
