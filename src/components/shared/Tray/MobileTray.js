import React, { useState } from 'react';

// Import Components
import TrayComponents from './TrayComponents/TrayComponents';
// Import styles
import s from './Tray.module.scss';

const MobileTray = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${s.tray} ${open ? s.trayIsOpen : ''}`}>
      <button
        type="button"
        className={`${s.drawerHandle} wmnds-col-1`}
        onClick={() => setOpen(!open)}
      >
        <p>Swipe tray up</p>
      </button>
      <div className={`${s.swipeTrayWrapper} wmnds-p-md`}>
        <TrayComponents />
      </div>
    </div>
  );
};

export default MobileTray;
