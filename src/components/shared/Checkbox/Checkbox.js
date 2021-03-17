/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';

const InputCheckbox = ({ name, children, handleChange, checked, classes }) => {
  // Set input to render below

  return (
    <div className={`wmnds-fe-group ${classes}`}>
      <label className="wmnds-fe-checkboxes__container wmnds-m-none">
        {children}
        <input
          defaultChecked={checked}
          className="wmnds-fe-checkboxes__input"
          onChange={handleChange}
          name={name}
          type="checkbox"
        />
        <span className="wmnds-fe-checkboxes__checkmark">
          <Icon className="wmnds-fe-checkboxes__icon" iconName="general-checkmark" />
        </span>
      </label>
    </div>
  );
};

InputCheckbox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  handleChange: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  classes: PropTypes.string,
};

InputCheckbox.defaultProps = {
  children: null,
  handleChange: null,
  classes: null,
};

export default InputCheckbox;
