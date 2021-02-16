import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../shared/Icon/Icon';
import s from './MapControls.module.scss';
import useMapControls from './useMapControls';

const MapControls = () => {
  const { fitToViewer, zoomInCenter, zoomOutCenter } = useMapControls();
  return (
    <div className={s.mapControls}>
      <button type="button" className={s.mapControlBtn} onClick={() => fitToViewer()}>
        <Icon iconName="general-sync" size={18} />
      </button>
      <button type="button" className={s.mapControlBtn} onClick={() => zoomInCenter()}>
        <Icon iconName="general-expand" size={18} />
      </button>
      <button type="button" className={s.mapControlBtn} onClick={() => zoomOutCenter()}>
        <Icon iconName="general-minimise" size={18} />
      </button>
    </div>
  );
};

MapControls.propTypes = {
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
  fitToViewer: PropTypes.func,
};
MapControls.defaultProps = {
  zoomIn: null,
  zoomOut: null,
  fitToViewer: null,
};

export default MapControls;
