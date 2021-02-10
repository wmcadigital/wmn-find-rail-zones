import React from 'react';
import Swipe from 'react-easy-swipe';

// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
// Import styles
import './MobileTray.scss';
import s from './Tray.module.scss';

const MobileTray = () => {
  return (
    <div className={`${s.tray}`}>
      <Swipe id="js-disruptions-tray" className={`${s.swipeTrayWrapper} wmnds-p-md`}>
        <div className={`${s.drawerHandle} wmnds-col-1`}>
          <p>Swipe tray up</p>
        </div>
        <TrayComponents />
      </Swipe>
    </div>
  );
};

export default MobileTray;
