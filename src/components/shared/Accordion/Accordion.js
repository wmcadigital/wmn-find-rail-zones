import React, { useState } from 'react';
import Icon from '../Icon/Icon';

const Accordion = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`wmnds-accordion ${open && 'wmnds-is--open'}`}>
      <button
        aria-controls="accordion-01"
        className="wmnds-accordion__summary-wrapper"
        aria-expanded={open}
        type="button"
        onClick={() => setOpen(!open)}
      >
        <div className="wmnds-accordion__summary">
          <h4 className="wmnds-m-b-none">Accordion heading</h4>
        </div>
        <Icon
          iconName="general-minimise"
          className="wmnds-accordion__icon  wmnds-accordion__icon--minimise"
        />
        <Icon iconName="general-expand" className="wmnds-accordion__icon" />
      </button>
      <div className="wmnds-accordion__content" id="accordion-01">
        Lorem ipsum dolar sit...
      </div>
    </div>
  );
};

export default Accordion;
