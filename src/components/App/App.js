import React from 'react';
// Rail zone svg component
import RailZoneMap from './RailZoneMap';
import Search from './Search';

import s from './App.module.scss';

function App() {
  return (
    <div className="wmnds-p-b-lg">
      <div className="wmnds-container">
        <h1>Find my rail zones</h1>
        <div>
          <p>Train stations across the West Midlands are in five zones.</p>
          <p>The zones you can travel between is based on your ticket.</p>
          <p>
            You can travel to a station outside the five rail zones with an Out of County ticket.
          </p>
        </div>
      </div>
      <div className={`${s.finder} bg-white`}>
        <div className="wmnds-container wmnds-grid wmnds-grid--spacing-md-2-lg">
          <div className="wmnds-col-1-3">
            <Search />
          </div>
          <div className="wmnds-col-2-3">
            <RailZoneMap />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
