import React from 'react';
import ContextProvider from 'globalState/ContextProvider';
import RailZoneFinderView from '../RailZoneFinder/RailZoneFinderView';

function App() {
  return (
    <ContextProvider>
      <RailZoneFinderView />
    </ContextProvider>
  );
}

export default App;
