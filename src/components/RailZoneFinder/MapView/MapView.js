import React, { useContext } from 'react';
import { FormContext } from 'globalState';
// Rail zone svg component
import Map from '../Map/Map';
import SearchComponents from '../../shared/SearchComponents/SearchComponents';
import Button from '../../shared/Button/Button';
import s from './MapView.module.scss';

const MapView = () => {
  const [formState, formDispatch] = useContext(FormContext);
  const changeView = () => {
    formDispatch({ type: 'UPDATE_VIEW', payload: true });
    window.scrollTo(0, 0);
  };
  return (
    <div className={s.mapViewSection}>
      <div className={`${s.container} wmnds-grid wmnds-grid--spacing-md-2-lg`}>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-1-3">
          <div className="bg-white wmnds-p-md">
            <SearchComponents />
            {formState.questionMode && (
              <Button text="Continue" iconRight="general-chevron-right" onClick={changeView} />
            )}
          </div>
        </div>
        <div className="wmnds-col-1-1 wmnds-col-md-1-2 wmnds-col-lg-2-3">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default MapView;
