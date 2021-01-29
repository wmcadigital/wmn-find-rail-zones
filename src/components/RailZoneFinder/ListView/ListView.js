import React from 'react';

import Button from '../../shared/Button/Button';
import Icon from '../../shared/Icon/Icon';
import Search from '../Search';

const ListView = () => {
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
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
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
        <div className="wmnds-col-2-3">Accordion</div>
        <div className="wmnds-col-1-3">
          <div className="wmnds-content-card">
            <div className="wmnds-p-md">
              <h3 className="h2">Key</h3>
              <ul className="wmnds-content-card__list wmnds-m-b-none">
                <li>
                  <Icon iconName="general-parking" size={20} className="wmnds-m-r-sm" /> Station
                  with full step-free access
                </li>
                <li>
                  <Icon iconName="general-parking" size={20} className="wmnds-m-r-sm" />
                  Station with part step-free access
                </li>
                <li>
                  <Icon iconName="general-parking" size={20} className="wmnds-m-r-sm" />
                  Station with parking
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
