import React, { useContext } from 'react';
import { MapContext, AutoCompleteContext } from 'globalState';
// Rail zone svg component
import Button from '../shared/Button/Button';
import Icon from '../shared/Icon/Icon';
import Breadcrumbs from '../shared/Breadcrumbs/Breadcrumbs';
import MapView from './MapView/MapView';
import ListView from './ListView/ListView';
import s from './RailZoneFinder.module.scss';

function RailZoneFinder() {
  const [autoCompleteState] = useContext(AutoCompleteContext);
  const [mapState, mapDispatch] = useContext(MapContext);
  const { mapView } = mapState;
  // Toggle between map and list view
  const setMapView = () => {
    mapDispatch({
      type: 'UPDATE_VIEW',
      payload: !mapView,
    });
  };

  return (
    <>
      <div className="wmnds-container">
        {autoCompleteState.ticketMode ? (
          <div className="wmnds-m-b-lg wmnds-m-t-md">
            <a
              href="https://deploy-preview-27--wmn-find-a-ticket.netlify.app/"
              className={`wmnds-btn wmnds-btn--link ${s.backLink}`}
            >
              <Icon iconName="general-chevron-right" /> Back to ticket finder
            </a>
          </div>
        ) : (
          <Breadcrumbs />
        )}
        <div className={`wmnds-grid wmnds-grid--justify-between ${s.mainHeading}`}>
          <div className="wmnds-col-auto">
            <h1>Find my rail zones</h1>
          </div>
          <div className="wmnds-col-auto">
            <Button
              text={mapView ? 'List view' : 'Map view'}
              btnClass="wmnds-btn--secondary"
              iconRight="general-chevron-right"
              onClick={() => setMapView(!mapView)}
            />
          </div>
        </div>
        <div className="wmnds-grid">
          <div className="wmnds-col-md-3-4">
            <p>
              Train stations across the West Midlands are in five zones. The zones you can travel
              between is based on your ticket.
            </p>
            <p>
              You can travel to a station outside the five rail zones with an Out of County ticket.
            </p>
          </div>
        </div>
      </div>
      {mapState.mapView ? <MapView /> : <ListView />}
    </>
  );
}

export default RailZoneFinder;
