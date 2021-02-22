import React, { useContext } from 'react';
import Button from '../../Button/Button';
import Result from '../../../RailZoneFinder/Result';
import TrainAutoComplete from '../TrayComponents/TrainAutoComplete/TrainAutocomplete';
import { AutoCompleteContext, MapContext } from 'globalState';
import s from './TrayComponents.module.scss';
import useMapControls from '../../../RailZoneFinder/Map/useMapControls';

const TrayComponents = () => {
  const [autoCompleteState, autoCompleteDispatch] = useContext(AutoCompleteContext);
  const [mapState] = useContext(MapContext);
  const { selectedStations } = autoCompleteState;
  const { resetMap } = useMapControls();

  const addStation = () => {
    autoCompleteDispatch({ type: 'ADD_STATION' });
  };

  const resetSearch = () => {
    if (mapState.mapView) {
      resetMap(selectedStations);
    }
    autoCompleteDispatch({ type: 'RESET_SELECTED_SERVICES' });
  };

  return (
    <>
      <div className={`${s.trayHeader}`}>
        <Button btnClass="wmnds-btn--link wmnds-m-l-md" text="Clear search" onClick={resetSearch} />
        <h2 className="h3">Enter your stations</h2>
      </div>
      <div className={`${s.traySearchContainer}`}>
        <div className="wmnds-m-b-md">
          <TrainAutoComplete label="From:" id="autocomplete_from" queryId={0} />
        </div>
        <div className="wmnds-m-b-md">
          <TrainAutoComplete label="To:" id="autocomplete_to" queryId={1} />
        </div>
        <Button
          btnClass={`wmnds-btn--primary wmnds-m-b-lg ${s.addBtn}`}
          iconRight="general-expand"
          text="Add another station"
          onClick={addStation}
        />
        {selectedStations.length > 2 && (
          <div className="wmnds-p-b-md">
            <div className={`wmnds-inset-text wmnds-m-b-sm wmnds-p-r-none ${s.addStation}`}>
              <div className="wmnds-fe-label">Add another train station you travel to</div>
              {selectedStations.slice(2).map((station, i) => (
                <TrainAutoComplete
                  id={`autocomplete_add${i + 2}`}
                  key={`autocomplete_add${i + 2}`}
                  queryId={i + 2}
                />
              ))}
              <div className="wmnds-text-align-right">
                <Button
                  btnClass="wmnds-btn--link"
                  text="+ Add another station"
                  onClick={addStation}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Result />
    </>
  );
};

export default TrayComponents;
