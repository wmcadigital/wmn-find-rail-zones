import React, { useState } from 'react';
import ContextProvider from 'globalState/ContextProvider';
// Rail zone svg component
import Button from '../shared/Button/Button';
import MapView from '../RailZoneFinder/MapView/MapView';
import ListView from '../RailZoneFinder/ListView/ListView';

function App() {
  const [mapView, setMapView] = useState(false);
  return (
    <ContextProvider>
      <div className="wmnds-p-b-lg">
        <div className="wmnds-container">
          <div className="wmnds-grid wmnds-grid--justify-between">
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
            <p>Train stations across the West Midlands are in five zones.</p>
            <p>The zones you can travel between is based on your ticket.</p>
            <p>
              You can travel to a station outside the five rail zones with an Out of County ticket.
            </p>
          </div>
        </div>
        {mapView ? <MapView /> : <ListView />}
      </div>
    </ContextProvider>
  );
}

export default App;
