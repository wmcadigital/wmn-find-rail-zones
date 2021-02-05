import React from 'react';
import ContextProvider from 'globalState/ContextProvider';
import RailZoneFinder from '../RailZoneFinder/RailZoneFinder';

function App() {
  return (
    <ContextProvider>
      <RailZoneFinder />
    </ContextProvider>
  );
}

export default App;
