import React from 'react';
import Button from '../shared/Button/Button';
import Autocomplete from '../shared/Autocomplete/Autocomplete';

const Result = () => {
  return (
    <div>
      Birmingham New Street is in <strong>Zone 1</strong>.<br />
      Worcester Forgate Street <strong>Out of County</strong>. Full step-free access is available at
      Birmingham New Street and Worcester Forgate Street. Parking is available at Birmingham New
      Street.
    </div>
  );
};

const Search = () => {
  return (
    <div className="wmnds-p-t-md">
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
          btnClass="wmnds-btn--primary"
          iconRight="general-expand"
          text="Add another station"
        />
      </form>
      <Result />
    </div>
  );
};

export default Search;
