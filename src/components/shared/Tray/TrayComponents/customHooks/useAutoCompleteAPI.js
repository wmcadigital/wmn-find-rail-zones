import { useEffect, useContext, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import railData from '../../../../RailZoneFinder/RailData.json';
// Import contexts
import { AutoCompleteContext } from 'globalState';

const useAutoCompleteAPI = (queryId) => {
  // State variables
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging
  const selectedService = autoCompleteState.selectedStations[queryId];

  const query = autoCompleteState.queries[queryId];

  // Reference variables
  const mounted = useRef();
  const source = useRef();
  const apiTimeout = useRef();
  // Helper functions

  const handleAutoCompleteApiResponse = useCallback(
    (response) => {
      setLoading(false); // Set loading state to false after data is received

      let payload;
      setResults(response || []);

      if (selectedService.id && response.length) {
        // Grab info matching rail data from json file
        const result = railData.railStationAccess.filter(
          (service) => service.crsCode === selectedService.id
        )[0];

        payload = {
          id: result.crsCode,
          queryId: queryId,
          ...result,
        };
      }

      // Update selectedStation based on payload set above if item already selected
      if (selectedService.id) {
        autoCompleteDispatch({
          type: 'UPDATE_SELECTED_STATION',
          payload,
        });
      }

      if ((!response || !response.data?.services) && mounted.current) {
        // If there is no bus data and the component is mounted (must be mounted or we will be creating an event on unmounted error)...
        // if no bus data, set error
        setErrorInfo({
          title: 'No results found',
          message: 'Make sure you are looking for the right service, and try again.',
        });
      }
    },
    [selectedService.id, autoCompleteDispatch, query, queryId] // [autoCompleteDispatch, selectedService.id]
  );

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAutoCompleteResults = useCallback(() => {
    setLoading(true);
    const response = query
      ? railData.railStationAccess.filter((station) =>
          station.stationName.toLowerCase().includes(query.trim().toLowerCase())
        )
      : [];

    handleAutoCompleteApiResponse(response);
  }, [handleAutoCompleteApiResponse]);

  useEffect(() => {
    getAutoCompleteResults();
  }, [getAutoCompleteResults]);

  return { loading, errorInfo, results, getAutoCompleteResults };
};

export default useAutoCompleteAPI;
