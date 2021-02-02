import React from 'react';
// Import components
import TrainAutoComplete from './TrainAutoComplete/TrainAutocomplete';

const AutoComplete = () => {
  // Render the correct component based on logic in switch statement above
  return (
    <>
      <TrainAutoComplete label="From:" id="autocomplete_from" />
      <TrainAutoComplete label="To:" id="autocomplete_to" to />
    </>
  );
};

export default AutoComplete;
