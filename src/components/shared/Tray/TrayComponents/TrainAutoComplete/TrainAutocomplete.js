import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input

// Import Context
import { AutoCompleteContext } from 'globalState';
// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import TrainAutoCompleteResult from './TrainAutoCompleteResult/TrainAutoCompleteResult';
import SelectedServiceHeader from '../SelectedServiceHeader/SelectedServiceHeader';
// CustomHooks
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';

const TrainAutoComplete = ({ id, label, queryId }) => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const trainQuery = autoCompleteState.queries[queryId];
  const selectedService = autoCompleteState.selectedStations[queryId];

  const { loading, errorInfo, results, getAutoCompleteResults } = useAutoCompleteAPI(queryId);

  const filteredResults = results.filter(
    (station) => !autoCompleteState.selectedStations.some((s) => s.id === station.crsCode)
  );
  const updateQueryTest = (query, queryId) => {
    autoCompleteDispatch({
      type: 'UPDATE_QUERY_TEST',
      queryId: queryId,
      payload: query,
    });
  };

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(resultsList, DebounceInput, results);

  return (
    <div className="wmnds-m-b-sm">
      {label && (
        <label className="wmnds-fe-label" htmlFor={id}>
          {label}
        </label>
      )}
      {selectedService.id ? (
        <SelectedServiceHeader
          autoCompleteState={autoCompleteState}
          autoCompleteDispatch={() =>
            autoCompleteDispatch({ type: 'RESET_SELECTED_ITEM', payload: { queryId } })
          }
          queryId={queryId}
        />
      ) : (
        <>
          <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
            <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
            <div className="wmnds-loader" role="alert" aria-live="assertive">
              <p className="wmnds-loader__content">Content is loading...</p>
            </div>
            <DebounceInput
              id={id}
              type="text"
              name="trainSearch"
              placeholder="Search for a station"
              autoComplete="off"
              className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
              value={trainQuery || ''}
              onChange={(e) => updateQueryTest(e.target.value, queryId)}
              aria-label="Search for a station"
              debounceTimeout={600}
              onKeyDown={(e) => handleKeyDown(e)}
              inputRef={debounceInput}
            />
          </div>
          {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
          {!filteredResults.length && trainQuery && !loading && errorInfo ? (
            <Message
              type="error"
              title={errorInfo.title}
              message={errorInfo.message}
              showRetry={errorInfo?.isTimeoutError}
              retryCallback={getAutoCompleteResults}
            />
          ) : (
            // Only show autocomplete results if there is a query
            trainQuery && (
              <ul className="wmnds-autocomplete-suggestions" ref={resultsList}>
                {filteredResults.map((result) => (
                  <TrainAutoCompleteResult
                    key={result.crsCode}
                    result={result}
                    handleKeyDown={handleKeyDown}
                    queryId={queryId}
                  />
                ))}
              </ul>
            )
          )}
        </>
      )}
    </div>
  );
};

// PropTypes
TrainAutoComplete.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  queryId: PropTypes.number.isRequired,
};

// Default props
TrainAutoComplete.defaultProps = {
  label: null,
};

export default TrainAutoComplete;
