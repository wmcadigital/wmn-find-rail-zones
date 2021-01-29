import React from 'react';
import Icon from '../Icon/Icon';

const Accordion = () => {
  return (
    <div className="wmnds-accordion">
      <button
        aria-controls="accordion-01"
        className="wmnds-accordion__summary-wrapper"
        aria-expanded="false"
      >
        <div className="wmnds-accordion__summary">
          <h4 className="wmnds-m-b-none">Accordion heading</h4>
        </div>
        <Icon iconName="general-expand" className="wmnds-accordion__icon" />
        <Icon iconName="general-minimise" className="wmnds-accordion__icon" />
      </button>
      <div className="wmnds-accordion__content" id="accordion-01">
        Lorem ipsum dolar sit...
      </div>
    </div>
  );
};

export default Accordion;
