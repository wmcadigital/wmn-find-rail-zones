import React from 'react';
import Button from '../shared/Button/Button';

const Search = () => {
  return (
    <div className="wmnds-p-t-md">
      <div className="wmnds-text-align-right">
        <button type="button" className="wmnds-btn wmnds-btn--link">
          Clear search
        </button>
      </div>
      <h2 className="h3">Find your travel zones</h2>
      <form action="">
        <div className="wmnds-fe-group">
          <label className="wmnds-fe-label" htmlFor="from-input">
            From:
          </label>
          <input
            className="wmnds-fe-input"
            placeholder="Search for a station"
            id="from-input"
            name="input"
            type="text"
            value=""
          />
        </div>
        <div className="wmnds-fe-group">
          <label className="wmnds-fe-label" htmlFor="to-nput">
            To:
          </label>
          <input
            className="wmnds-fe-input"
            placeholder="Search for a station"
            id="to-input"
            name="input"
            type="text"
            value=""
          />
        </div>
        <Button
          btnClass="wmnds-btn--primary"
          iconRight="general-expand"
          text="Add another station"
        />
      </form>
    </div>
  );
};

export default Search;
