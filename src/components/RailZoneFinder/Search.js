import React from 'react';
import Button from '../shared/Button/Button';
import Result from './Result';
import Autocomplete from '../shared/Autocomplete/Autocomplete';

const Search = () => {
  return (
    <div className="wmnds-p-md">
      <div className="wmnds-text-align-right">
        <Button btnClass="wmnds-btn--link" text="Clear search" />
      </div>
      <h2 className="h3">Find your travel zones</h2>
      <form action="">
        <Autocomplete
          id="to-autocomplete"
          label="To:"
          placeholder="Search for a station"
          name="to-autocomplete"
        />
        <Autocomplete
          id="from-autocomplete"
          label="From:"
          placeholder="Search for a station"
          name="from-autocomplete"
        />
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
