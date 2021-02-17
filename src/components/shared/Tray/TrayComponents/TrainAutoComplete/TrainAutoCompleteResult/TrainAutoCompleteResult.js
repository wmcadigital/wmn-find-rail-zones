import React, { useContext } from 'react';
import { AutoCompleteContext, MapContext } from 'globalState';
// Import styles
import s from './TrainAutoCompleteResult.module.scss';
// Import custom hook
import useMapControls from '../../../../../RailZoneFinder/Map/useMapControls';

const TrainAutoCompleteResult = (props) => {
  const { result, handleKeyDown, queryId } = props || {};

  const [mapState] = useContext(MapContext);
  const [, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const { fitZoneToViewer } = useMapControls();

  // Set payload object to pass below
  const payload = {
    id: result.crsCode,
    queryId,
  };

  const updateSelectedService = () => {
    //  Update normal selectedStation
    if (mapState.mapView) {
      fitZoneToViewer(result.railZone);
    }

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
      onClick={() => updateSelectedService()}
    >
      {/* Right section */}
      <strong className={`${s.routeName}`}>{result.stationName}</strong>
    </li>
  );
};

export default TrainAutoCompleteResult;
