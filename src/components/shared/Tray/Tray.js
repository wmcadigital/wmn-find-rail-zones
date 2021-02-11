import React, { useContext } from 'react';
// Import contexts
import { AutoCompleteContext } from 'globalState';
// Import customHooks
import useWindowHeightWidth from 'customHooks/useWindowHeightWidth';
// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
import MobileTray from './MobileTray';
import s from './Tray.module.scss';

const Tray = () => {
  const { windowWidth } = useWindowHeightWidth(); // Get window height and width
  const [autoCompleteState] = useContext(AutoCompleteContext);

  const mobileTray = <MobileTray />;
  const DesktopTray = (
    <div className={`${s.tray} wmnds-p-md ${autoCompleteState.mapView ? s.mapTray : ''}`}>
      <TrayComponents />
    </div>
  );

  return <>{windowWidth < 768 ? mobileTray : DesktopTray}</>;
};

export default Tray;
