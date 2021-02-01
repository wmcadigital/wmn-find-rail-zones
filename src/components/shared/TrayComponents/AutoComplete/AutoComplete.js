import React from 'react';
// Import components
import TrainAutoComplete from './TrainAutoComplete/TrainAutocomplete';

const AutoComplete = () => {
  const autoCompleteTitle = (title, subtitle = '') => {
    return (
      <div className="wmnds-col-1">
        <h4>{title}</h4>
        {subtitle && <p>{subtitle}</p>}
      </div>
    );
  };

  // Render the correct component based on logic in switch statement above
  return (
    <div className="wmnds-grid">
      {autoCompleteTitle('Trains between')}
      <TrainAutoComplete />
      {autoCompleteTitle('and')}
      <TrainAutoComplete to />
    </div>
  );
};

export default AutoComplete;
