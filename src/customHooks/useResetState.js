import { useContext } from 'react';
// Import contexts
import { AutoCompleteContext } from 'globalState';

const useResetState = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext); // Get the state of autoComplete from AutoCompleteContext

  // Function for checking and resetting any selected service or query
  const resetQueryAndSelected = () => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedItem.id || autoCompleteState.query) {
      autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' });
    }
  };

  // Function used in busautocomplete.js to update busautocomplete state and reset any state "below" it in the tray
  const updateQuery = (query, to) => {
    // Reset selected disruption ID from map (if any)
    if (autoCompleteState.selectedItem.selectedByMap) {
      resetQueryAndSelected(); // Reset autocomplete/selectedService if in state
    }
    autoCompleteDispatch({ type: 'UPDATE_QUERY', query: query.trim(), to }); // Update query to what user has typed & trim
  };

  return {
    updateQuery,
    autoCompleteState,
    autoCompleteDispatch,
  };
};

export default useResetState;
