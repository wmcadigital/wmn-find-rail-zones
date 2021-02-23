import React, { useContext } from 'react';
import { MapContext } from 'globalState';
// Rail zone svg component
import Button from '../shared/Button/Button';
import MapView from './MapView/MapView';
import ListView from './ListView/ListView';
import s from './RailZoneFinder.module.scss';

function RailZoneFinder() {
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
        <div>
          <p>
            Train stations across the West Midlands are in five zones. The zones you can travel
            between is based on your ticket.
          </p>
          <p>
            You can travel to a station outside the five rail zones with an Out of County ticket.
          </p>
        </div>
      </div>
      {mapState.mapView ? <MapView /> : <ListView />}
    </>
  );
}

export default RailZoneFinder;
