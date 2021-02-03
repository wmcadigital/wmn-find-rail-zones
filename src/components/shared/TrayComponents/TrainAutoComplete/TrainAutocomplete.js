import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input'; // https://www.npmjs.com/package/react-debounce-input

// CustomHooks
import useResetState from 'customHooks/useResetState';
// Import components
import Message from 'components/shared/Message/Message';
import Icon from 'components/shared/Icon/Icon';
import TrainAutoCompleteResult from './TrainAutoCompleteResult/TrainAutoCompleteResult';
import SelectedServiceHeader from '../SelectedServiceHeader/SelectedServiceHeader';
// CustomHooks
import useHandleAutoCompleteKeys from '../customHooks/useHandleAutoCompleteKeys';
import useAutoCompleteAPI from '../customHooks/useAutoCompleteAPI';

const TrainAutoComplete = ({ id, label, queryId }) => {
  const { updateQuery, autoCompleteState, autoCompleteDispatch } = useResetState();

  const resultsList = useRef(null);
  const debounceInput = useRef(null);

  const trainQuery = autoCompleteState.queries[queryId];
  const selectedService = autoCompleteState.selectedStations[queryId];

  const { loading, errorInfo, results, getAutoCompleteResults } = useAutoCompleteAPI(
    `/rail/v2/station?q=${encodeURI(trainQuery)}`,
    'train',
    queryId
  );

  // Import handleKeyDown function from customHook (used by all modes)
  const { handleKeyDown } = useHandleAutoCompleteKeys(resultsList, DebounceInput, results);

  return (
    <div className="wmnds-m-b-sm">
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
          {label && (
            <label className="wmnds-fe-label" htmlFor={id}>
              {label}
            </label>
          )}
          <div className={`wmnds-autocomplete wmnds-grid ${loading ? 'wmnds-is--loading' : ''}`}>
            <Icon iconName="general-search" className="wmnds-autocomplete__icon" />
            <div className="wmnds-loader" role="alert" aria-live="assertive">
              <p className="wmnds-loader__content">Content is loading...</p>
            </div>
            <DebounceInput
              type="text"
              name="trainSearch"
              placeholder="Search for a station"
              className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
              value={trainQuery || ''}
              onChange={(e) => updateQuery(e.target.value, queryId)}
              aria-label="Search for a station"
              debounceTimeout={600}
              onKeyDown={(e) => handleKeyDown(e)}
              inputRef={debounceInput}
            />
          </div>
          {/* If there is no data.length(results) and the user hasn't submitted a query and the state isn't loading then the user should be displayed with no results message, else show results */}
          {!results.length && trainQuery && !loading && errorInfo ? (
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
                {results.map((result) => (
                  <TrainAutoCompleteResult
                    key={result.id}
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
