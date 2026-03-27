/* eslint-disable react/require-default-props */
/**
 * AccessibilityKey Component
 *
 * Renders an accessibility and parking information key that displays:
 * - Stations with full step-free access
 * - Stations with partial step-free access
 * - Stations with parking
 *
 * When used in map view, includes toggleable checkboxes to filter visible stations.
 * In other views, displays as a collapsible information panel.
 */

import React, { useState, useContext } from 'react';

import PropTypes from 'prop-types';
import { MapContext } from 'globalState';

import { Icon } from '../Icon/Icon';
import { AccessIcon } from '../Icon/AccessIcon';
import { Button } from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

import s from './AccessibilityKey.module.scss';

export function AccessibilityKey({ mapView = false }) {
  // Access map state and dispatch from context
  const [mapState, mapDispatch] = useContext(MapContext);
  // Controls visibility of the accessibility key panel
  // Defaults to shown (!mapView) unless in map view mode
  const [showKey, setShowKey] = useState(!mapView);

  /**
   * Toggles the visibility of a specific accessibility station type
   * @param {string} type - The accessibility type to toggle ('full', 'partial', or 'parking')
   */
  const showStations = (type) => {
    mapDispatch({
      type: 'TOGGLE_ACCESS_VISIBILITY',
      payload: { ...mapState.accessVisibility, [type]: !mapState.accessVisibility[type] },
    });
  };

  // Main key content - renders in both map and non-map contexts
  const Key = (
    <>
      {/* Full step-free access stations */}
      <div className={`${s.keyIcon}`}>
        {mapView ? (
          <Checkbox
            classes="wmnds-m-none"
            handleChange={() => showStations('full')}
            name="access_toggle"
            checked={mapState.accessVisibility.full}
          >
            <AccessIcon type="full" className="wmnds-m-r-sm" /> Stations with full step-free access
          </Checkbox>
        ) : (
          <>
            <AccessIcon type="full" className="wmnds-m-r-sm" /> Stations with full step-free access
          </>
        )}
      </div>

      {/* Partial step-free access stations */}
      <div className={`${s.keyIcon}`}>
        {mapView ? (
          <Checkbox
            classes="wmnds-m-none"
            handleChange={() => showStations('partial')}
            name="access_toggle"
            checked={mapState.accessVisibility.partial}
          >
            <AccessIcon type="part" className="wmnds-m-r-sm" /> Stations with part step-free access
          </Checkbox>
        ) : (
          <>
            <AccessIcon type="part" className="wmnds-m-r-sm" /> Stations with part step-free access
          </>
        )}
      </div>

      {/* Parking availability stations */}
      <div className={`${s.keyIcon}`}>
        {mapView ? (
          <Checkbox
            classes="wmnds-m-none"
            handleChange={() => showStations('parking')}
            name="access_toggle"
            checked={mapState.accessVisibility.parking}
          >
            <Icon iconName="general-parking" className="wmnds-m-r-sm" color="cta" /> Stations with
            parking
          </Checkbox>
        ) : (
          <>
            <Icon iconName="general-parking" className="wmnds-m-r-sm" color="cta" /> Stations with
            parking
          </>
        )}
      </div>
    </>
  );

  // Render different layouts based on mapView prop
  // Map view: collapsible button with expandable panel on the right
  // Non-map view: standard collapsible panel
  return mapView ? (
    <div className={s.mapKeyContainer}>
      {!showKey ? (
        // Collapsed state - show button to expand
        <Button
          btnClass={`wmnds-btn--primary ${s.showKeyBtn}`}
          text="Show parking and accessibility"
          iconRight="general-chevron-right"
          onClick={() => setShowKey(true)}
        />
      ) : (
        // Expanded state - show full key with hide button
        <div className={`wmnds-p-md bgWhite ${s.accessMenu} ${s.mapKey}`}>
          <div className={`wmnds-grid wmnds-grid--justify-between ${s.keyHeader}`}>
            <h3 className="wmnds-col-auto">Show parking and accessibility</h3>
            <div className="wmnds-col-auto">
              <Button
                btnClass={`wmnds-btn--link ${s.hideKeyBtn}`}
                text="Hide"
                iconRight="general-chevron-right"
                onClick={() => setShowKey(false)}
              />
            </div>
          </div>
          {Key}
        </div>
      )}
    </div>
  ) : (
    // Non-map view: standard accordion-style panel
    <div className={`wmnds-p-md bgWhite ${s.accessMenu}`}>
      <div className="wmnds-grid wmnds-grid--justify-between">
        <h3 className={`h2 wmnds-col-auto ${!showKey && 'wmnds-m-b-none'}`}>Key</h3>
        <div className="wmnds-col-auto">
          <Button
            btnClass={`wmnds-btn--link ${s.hideKeyBtn}`}
            text={showKey ? 'Hide' : 'Show'}
            onClick={() => setShowKey(!showKey)}
          />
        </div>
      </div>
      {showKey && Key}
    </div>
  );
}

// Define prop types
// mapView: boolean - if true, renders with map-specific styling and interactive checkboxes
// eslint-disable-next-line react/require-default-props
AccessibilityKey.propTypes = {
  mapView: PropTypes.bool,
};

export default AccessibilityKey;
