import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';

const Accordion = ({ id, children, heading, isOpen, handleClick }) => {
  return (
    <div className={`wmnds-accordion ${isOpen && 'wmnds-is--open'}`}>
      <button
        aria-controls={id}
        className="wmnds-accordion__summary-wrapper"
        aria-expanded={isOpen}
        type="button"
        onClick={() => handleClick(!isOpen)}
      >
        <div className="wmnds-accordion__summary">
          <h4 className="wmnds-m-b-none">{heading}</h4>
        </div>
        <Icon
          iconName="general-minimise"
          className="wmnds-accordion__icon  wmnds-accordion__icon--minimise"
        />
        <Icon iconName="general-expand" className="wmnds-accordion__icon" />
      </button>
      <div className="wmnds-accordion__content" id={id}>
        {children}
      </div>
    </div>
  );
};

Accordion.propTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Accordion;
