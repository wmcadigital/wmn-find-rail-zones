import { useEffect, useContext, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import railData from '../../../../RailZoneFinder/RailData.json';
// Import contexts
import { AutoCompleteContext } from 'globalState';

const useAutoCompleteAPI = (apiPath, query, queryId) => {
  // State variables
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the dispatch of autocomplete
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Set loading state for spinner
  const [errorInfo, setErrorInfo] = useState(); // Placeholder to set error messaging
  const selectedService = autoCompleteState.selectedStations[queryId];

  // Reference variables
  const mounted = useRef();
  const source = useRef();
  const apiTimeout = useRef();
  // Helper functions
  const cancelRequest = () => {
    if (source.current) source.current.cancel('Api request timeout');
  };

  const startApiTimeout = useCallback(() => {
    apiTimeout.current = setTimeout(() => {
      cancelRequest();
    }, 15000); // 15 seconds
  }, []);

  const clearApiTimeout = () => clearTimeout(apiTimeout.current);

  const handleAutoCompleteApiResponse = useCallback(
    (response) => {
      setLoading(false); // Set loading state to false after data is received

      let payload;
      setResults(response.data.data || []);

      if (selectedService.id && response.data?.data.length) {
        const result = response.data.data.filter((service) => service.id === selectedService.id)[0];
        // Grab rail matching rail data from json file
        const stationData = railData.railStationAccess.find((item) => result.id === item.crsCode);

        payload = {
          id: result.id,
          queryId: queryId,
          stopName: result.name,
          ...stationData,
        };
      }

      // Update selectedStation based on payload set above if item already selected
      if (selectedService.id) {
        autoCompleteDispatch({
          type: 'UPDATE_SELECTED_STATION',
          payload,
        });
      }

      if ((!response.data.data || !response.data.services) && mounted.current) {
        // If there is no bus data and the component is mounted (must be mounted or we will be creating an event on unmounted error)...
        // if no bus data, set error
        setErrorInfo({
          title: 'No results found',
          message: 'Make sure you are looking for the right service, and try again.',
        });
      }
    },
    [selectedService.id, autoCompleteDispatch, queryId] // [autoCompleteDispatch, selectedService.id]
  );

  const handleAutoCompleteApiError = (error) => {
    setLoading(false); // Set loading state to false after data is received
    setErrorInfo({
      // Update error message
      title: 'Please try again',
      message: 'Apologies, we are having technical difficulties.',
      isTimeoutError: axios.isCancel(error),
    });
    setResults([]); // Reset the results so that the dropdown disappears
    if (!axios.isCancel(error)) {
      // eslint-disable-next-line no-console
      console.log({ error });
    }
  };

  // Take main function out of useEffect, so it can be called elsewhere to retry the search
  const getAutoCompleteResults = useCallback(() => {
    source.current = axios.CancelToken.source();
    mounted.current = true; // Set mounted to true (used later to make sure we don't do events as component is unmounting)
    const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env; // Destructure env vars
    setLoading(true); // Update loading state to true as we are hitting API
    startApiTimeout();
    axios
      .get(REACT_APP_API_HOST + apiPath, {
        headers: {
          'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
        },
        cancelToken: source.current.token, // Set token with API call, so we can cancel this call on unmount
      })
      .then(handleAutoCompleteApiResponse)
      .catch(handleAutoCompleteApiError);
  }, [apiPath, handleAutoCompleteApiResponse, startApiTimeout]);

  useEffect(() => {
    if (query) {
      getAutoCompleteResults();
    }
    // Unmount / cleanup
    return () => {
      mounted.current = false; // Set mounted back to false on unmount
      cancelRequest(); // cancel the request
      clearApiTimeout(); // clear timeout
    };
  }, [getAutoCompleteResults, query]);

  return { loading, errorInfo, results, getAutoCompleteResults };
};

export default useAutoCompleteAPI;
