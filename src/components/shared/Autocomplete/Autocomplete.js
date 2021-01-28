import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const Autocomplete = ({ id, label, name, placeholder, results }) => {
  return (
    <div className="wmnds-fe-group">
      <label className="wmnds-fe-label" htmlFor={id}>
        {label}
      </label>
      <div className="wmnds-autocomplete wmnds-grid">
        {/* Search icon */}
        <Icon className="wmnds-autocomplete__icon" iconName="general-search" />
        {/* normal sized loader */}
        <div className="wmnds-loader" role="alert" aria-live="assertive">
          <p className="wmnds-loader__content">Content is loading...</p>
        </div>
        {/* Autocomplete input box */}
        <input
          className="wmnds-fe-input wmnds-autocomplete__input wmnds-col-1"
          value=""
          placeholder={placeholder}
          name={name}
          aria-label={placeholder}
          type="text"
          id={id}
        />
      </div>
      {results && (
        <ul className="wmnds-autocomplete-suggestions">
          <li className="wmnds-autocomplete-suggestions__li" title="Search result 1">
            This is <strong>my query</strong> result 1
          </li>
          <li className="wmnds-autocomplete-suggestions__li" title="Search result 2">
            This is <strong>my query</strong> result 2
          </li>
          <li className="wmnds-autocomplete-suggestions__li" title="Search result 3">
            This is <strong>my query</strong> result 3
          </li>
        </ul>
      )}
    </div>
  );
};

// Set props
Autocomplete.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.string),
};

Autocomplete.defaultProps = {
  label: 'label',
  name: 'autocomplete',
  placeholder: 'placeholder',
  results: null,
};

export default Autocomplete;
