import React from 'react';
import Icon from '../../../shared/Icon/Icon';
import s from './MapControls.module.scss';
import useMapControls from '../customHooks/useMapControls';

const MapControls = () => {
  const { fitToViewer, zoomInCenter, zoomOutCenter } = useMapControls();
  return (
    <div className={s.mapControls}>
      <button type="button" className={s.mapControlBtn} onClick={() => fitToViewer()}>
        <Icon title="Fit map to view" iconName="general-sync" size={18} />
      </button>
      <button type="button" className={s.mapControlBtn} onClick={() => zoomInCenter()}>
        <Icon title="Zoom in" iconName="general-expand" size={18} />
      </button>
      <button type="button" className={s.mapControlBtn} onClick={() => zoomOutCenter()}>
        <Icon title="Zoom out" iconName="general-minimise" size={18} />
      </button>
    </div>
  );
};

export default MapControls;
