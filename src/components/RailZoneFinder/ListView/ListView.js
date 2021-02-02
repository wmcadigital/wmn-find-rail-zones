import React, { useState } from 'react';

import Button from '../../shared/Button/Button';
import AccessIcon from '../../shared/Icon/AccessIcon';
import Icon from '../../shared/Icon/Icon';
import Accordion from '../../shared/Accordion/Accordion';
import Search from '../Search';

import railData from '../RailData.json';

const ListView = () => {
  const [accordions, setAccordions] = useState([
    { name: 'Zone 1', open: false },
    { name: 'Zone 2', open: false },
    { name: 'Zone 3', open: false },
    { name: 'Zone 4', open: false },
    { name: 'Zone 5', open: false },
  ]);

  const toggleAccordions = (open) => {
    let newState = accordions.map((accordion) => {
      open ? (accordion.open = true) : (accordion.open = false);
      return accordion;
    });
    setAccordions([...newState]);
  };

  return (
    <div className="wmnds-container">
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg wmnds-p-b-md">
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
              <Button
                onClick={() => toggleAccordions(true)}
                text="Open all"
                btnClass="wmnds-m-r-sm wmnds-btn--primary"
              />
              <Button
                onClick={() => toggleAccordions(false)}
                text="Close all"
                btnClass="wmnds-btn--primary"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg">
        <div className="wmnds-col-2-3">
          {accordions.map((accordion, i) => {
            const accordionId = `${accordion.name.toLowerCase().replace(' ', '')}-${i}`;
            const handleClick = () => {
              let newState = accordions;
              newState[i].open = !accordions[i].open;
              setAccordions([...newState]);
            };
            const zoneStations = railData.railStationAccess.filter(
              (station) => station.railZone === i + 1
            );
            return (
              <div key={accordionId} className="wmnds-p-b-md">
                <Accordion
                  key={accordionId}
                  id={accordionId}
                  heading={accordion.name}
                  isOpen={accordion.open}
                  handleClick={handleClick}
                >
                  <ul>
                    {zoneStations.map((station) => (
                      <li key={station.crsCode} style={{ display: 'flex' }}>
                        {station.crsCode}
                        {station.stepFreeAccess && station.stepFreeAccess === 'full' ? (
                          <AccessIcon className="wmnds-m-l-xsm" />
                        ) : (
                          <AccessIcon type="part" className="wmnds-m-l-xsm" />
                        )}
                        {station.parking && (
                          <Icon iconName="general-parking" className="wmnds-m-l-xsm" color="cta" />
                        )}
                      </li>
                    ))}
                  </ul>
                </Accordion>
              </div>
            );
          })}
        </div>
        <div className="wmnds-col-1-3" style={{ alignSelf: 'flex-start' }}>
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
