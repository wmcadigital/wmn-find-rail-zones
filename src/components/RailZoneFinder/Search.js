import React from 'react';
import Button from '../shared/Button/Button';
import Result from './Result';
import TrainAutoComplete from '../shared/TrayComponents/TrainAutoComplete/TrainAutocomplete';

const Search = () => {
  return (
    <div className="wmnds-p-md">
      <div className="wmnds-text-align-right">
        <Button btnClass="wmnds-btn--link" text="Clear search" />
      </div>
      <h2 className="h3">Find your travel zones</h2>
      <form action="">
        <TrainAutoComplete label="From:" id="autocomplete_from" />
        <TrainAutoComplete label="To:" id="autocomplete_to" to />
        <Button
          btnClass="wmnds-btn--primary wmnds-m-b-lg"
          iconRight="general-expand"
          text="Add another station"
        />
      </form>
      <Result />
    </div>
  );
};

export default Search;
