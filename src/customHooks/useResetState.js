import { useContext } from 'react';
// Import contexts
import { AutoCompleteContext } from 'globalState';

const useResetState = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of autoComplete from AutoCompleteContext

  // Function used in busautocomplete.js to update busautocomplete state and reset any state "below" it in the tray
  const updateQuery = (query, queryId) => {
    autoCompleteDispatch({ type: 'UPDATE_QUERY', query: query.trim(), queryId }); // Update query to what user has typed & trim
  };

  return {
    updateQuery,
    autoCompleteState,
    autoCompleteDispatch,
  };
};

export default useResetState;
