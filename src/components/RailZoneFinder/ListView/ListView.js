import React, { useState } from 'react';

import Button from '../../shared/Button/Button';
import AccessIcon from '../../shared/Icon/AccessIcon';
import Icon from '../../shared/Icon/Icon';
import Accordion from '../../shared/Accordion/Accordion';
import Search from '../Search';

const ListView = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="wmnds-container">
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-md-2-3">
          <div className="bg-white">
            <Search />
          </div>
        </div>
      </div>
      <h2>Stations by zone</h2>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg wmnds-m-b-md">
        <div className="wmnds-col-2-3">
          <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
            <div className="wmnds-col-auto">
              <p className="wmnds-m-none">View a list of all the train stations in each zone.</p>
            </div>
            <div className="wmnds-col-auto">
              <Button text="Open all" btnClass="wmnds-m-r-sm wmnds-btn--primary" />
              <Button text="Close all" btnClass="wmnds-btn--primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-2-3">
          <Accordion
            id="zone1Accordion"
            heading="Zone 1"
            isOpen={open}
            handleClick={() => setOpen(!open)}
          >
            Content
          </Accordion>
        </div>
        <div className="wmnds-col-1-3">
          <div className="wmnds-content-card">
            <div className="wmnds-p-md">
              <h3 className="h2">Key</h3>
              <ul className="wmnds-content-card__list wmnds-m-b-none">
                <li className="wmnds-grid wmnds-grid--spacing-2-sm">
                  <div className="wmnds-col-auto">
                    <AccessIcon type="full" size={20} />
                  </div>
                  <div className="wmnds-col-auto">Station with full step-free access</div>
                </li>
                <li className="wmnds-grid wmnds-grid--spacing-2-sm">
                  <div className="wmnds-col-auto">
                    <AccessIcon type="part" size={20} />
                  </div>
                  <div className="wmnds-col-auto">Station with part step-free access</div>
                </li>
                <li className="wmnds-grid wmnds-grid--spacing-2-sm">
                  <div className="wmnds-col-auto">
                    <Icon iconName="general-parking" size={20} color="cta" />
                  </div>
                  <div className="wmnds-col-auto">Station with parking</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
