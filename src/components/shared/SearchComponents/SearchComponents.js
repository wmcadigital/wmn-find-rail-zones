import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// Import context
import { AutoCompleteContext, FormContext } from 'globalState';
// Import components
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import Result from '../Result/Result';
import TrainAutoComplete from './TrainAutoComplete/TrainAutocomplete';
import s from './SearchComponents.module.scss';
// Import custom hook
import useMapControls from '../../RailZoneFinder/Map/customHooks/useMapControls';

const SearchComponents = ({ showHeader }) => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const [formState] = useContext(FormContext);
  const { selectedStations } = autoCompleteState;
  const { resetMap } = useMapControls();

  const addStation = () => {
    autoCompleteDispatch({ type: 'ADD_STATION' });
  };

  const resetSearch = () => {
    resetMap(selectedStations);
    autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' });
  };

  const stationIds = [...selectedStations.map((stn) => stn.id)];

  const continueBtn =
    formState.questionMode && autoCompleteState.selectedStations.filter((stn) => stn.id).length > 1;

  return (
    <>
      {showHeader && (
        <div className={`${s.trayHeader}`}>
          <Button
            btnClass="wmnds-btn--link wmnds-m-l-md"
            text="Clear search"
            onClick={resetSearch}
          />
          <h2 className="h3">Enter your stations</h2>
        </div>
      )}
      <div className={`${s.traySearchContainer}`}>
        <div className="wmnds-m-b-md">
          <TrainAutoComplete label="From:" id="autocomplete_from" queryId={0} />
        </div>
        <div className="wmnds-m-b-md">
          <TrainAutoComplete label="To:" id="autocomplete_to" queryId={1} />
        </div>
        {selectedStations.length > 2 && (
          <div className="wmnds-p-b-md">
            <div className={`wmnds-inset-text wmnds-m-b-sm wmnds-p-r-none ${s.addStation}`}>
              <div className="wmnds-fe-label">Add another train station you travel to</div>
              {selectedStations.slice(2).map((station, i) => (
                <TrainAutoComplete
                  id={`autocomplete_add${i + 2}`}
                  key={`autocomplete_add${i + 2}`}
                  queryId={i + 2}
                />
              ))}
            </div>
          </div>
        )}
        <Button
          btnClass={`wmnds-btn--primary wmnds-m-b-lg ${s.addBtn}`}
          iconRight="general-expand"
          text="Add another station"
          onClick={addStation}
          disabled={selectedStations.length >= 12}
        />
      </div>
      <Result />
      {continueBtn && (
        <a
          href={`https://find-a-ticket.wmnetwork.co.uk/?stations=${stationIds.join('+')}`}
          className="wmnds-btn wmnds-btn--icon wmnds-col-1 wmnds-col-sm-auto"
        >
          Continue
          <Icon
            className="wmnds-btn__icon wmnds-btn__icon--right"
            iconName="general-chevron-right"
          />
        </a>
      )}
    </>
  );
};

SearchComponents.propTypes = {
  showHeader: PropTypes.bool,
};

SearchComponents.defaultProps = {
  showHeader: true,
};

export default SearchComponents;
