import React, { useState } from 'react';
import Button from '../../shared/Button/Button';
import AccessIcon from '../../shared/Icon/AccessIcon';
import Icon from '../../shared/Icon/Icon';
import AccessibilityKey from '../../shared/AccessibilityKey/AccessibilityKey';
import Accordion from '../../shared/Accordion/Accordion';
import AutoComplete from '../../shared/AutoComplete/AutoComplete';
import s from './ListView.module.scss';

import railData from '../RailData.json';

const ListView = () => {
  const [accordions, setAccordions] = useState([
    { name: 'Zone 1', open: false },
    { name: 'Zone 2', open: false },
    { name: 'Zone 3', open: false },
    { name: 'Zone 4', open: false },
    { name: 'Zone 5', open: false },
    { name: 'nTrain Zone 5', open: false },
  ]);

  const toggleAccordions = (open) => {
    const newState = accordions.map((accordion) => {
      // make sure all accordions do the right thing
      const accordionState = accordion;
      if (open) {
        accordionState.open = true;
      } else {
        accordionState.open = false;
      }
      return accordionState;
    });
    setAccordions([...newState]);
  };

  return (
    <div className="wmnds-container">
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg wmnds-p-b-md">
        <div className="wmnds-col-1-1 wmnds-col-md-2-3">
          <div className={`bg-white wmnds-p-md ${s.trayComponents}`}>
            <AutoComplete />
          </div>
        </div>
      </div>
      <h2>Stations by zone</h2>
      <div className="wmnds-grid wmnds-grid--spacing-md-2-lg wmnds-m-b-md">
        <div className="wmnds-col-1-1 wmnds-col-md-2-3">
          <div className="wmnds-grid wmnds-grid--justify-between wmnds-grid--align-center">
            <div className="wmnds-col-1-1 wmnds-col-md-auto">
              <p className="wmnds-m-b-sm wmnds-m-t-sm">
                View a list of all the train stations in each zone.
              </p>
            </div>
            <div className="wmnds-col-1-1 wmnds-col-md-auto">
              <div className="wmnds-hide-mobile">
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
      </div>
      <div className={`wmnds-grid wmnds-grid--spacing-md-2-lg wmnds-p-b-lg ${s.reverseXs}`}>
        <div className="wmnds-col-1-1 wmnds-col-md-2-3">
          <div className="wmnds-hide-desktop wmnds-m-b-md">
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
          {accordions.map((accordion, i) => {
            // Make id from accordion name
            const accordionId = `${accordion.name.toLowerCase().replace(' ', '')}-${i}`;
            // Update accordion state on click
            const handleClick = () => {
              const newState = accordions;
              newState[i].open = !accordions[i].open;
              setAccordions([...newState]);
            };
            // Filter stations with railZones matching the current iteration (i)
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
                      <li key={station.crsCode} className={s.accordionListItem}>
                        {station.stationName}
                        {station.stepFreeAccess && (
                          <>
                            {station.stepFreeAccess === 'full' ? (
                              <>
                                {' '}
                                <span className={s.srOnly}>which has full step free access</span>
                                <AccessIcon className="wmnds-m-l-xsm" />
                              </>
                            ) : (
                              <>
                                {' '}
                                <span className={s.srOnly}>which has partial step free access</span>
                                <AccessIcon type="part" className="wmnds-m-l-xsm" />
                              </>
                            )}
                          </>
                        )}
                        {station.parking && (
                          <>
                            <span className={s.srOnly}>
                              {station.stepFreeAccess ? 'and parking' : 'which has parking'}
                            </span>

                            <Icon
                              iconName="general-parking"
                              className="wmnds-m-l-xsm"
                              color="cta"
                            />
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </Accordion>
              </div>
            );
          })}
        </div>
        <div className={`wmnds-col-1-1 wmnds-col-md-1-3 ${s.keyCol}`}>
          <div className="wmnds-content-card">
            <AccessibilityKey />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListView;
