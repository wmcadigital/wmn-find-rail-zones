import React, { useContext } from 'react';
// Import contexts
import { AutoCompleteContext } from 'globalState';
import railData from '../components/RailZoneFinder/RailData.json';

const useResetState = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of autoComplete from AutoCompleteContext

  const [results, setResults] = React.useState([]);

  // Function used in busautocomplete.js to update busautocomplete state and reset any state "below" it in the tray
  const updateQuery = (query, queryId) => {
    console.log(
      railData.railStationAccess.filter((station) =>
        station.stationName.toLowerCase().includes(query.trim().toLowerCase())
      )
    );
    // setResults(RailData.railStationAccess.filter((station) => station.stationName.includes(query)));
    // console.log(results);
    autoCompleteDispatch({ type: 'UPDATE_QUERY', query: query.trim(), queryId }); // Update query to what user has typed & trim
  };

  return {
    updateQuery,
    autoCompleteState,
    autoCompleteDispatch,
  };
};

export default useResetState;
