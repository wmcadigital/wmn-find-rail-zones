import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// Imported components
import CloseButton from './CloseButton/CloseButton';
import s from './SelectedServiceHeader.module.scss';
import useMapControls from '../../../../../customHooks/useMapControls';

const SelectedServiceHeader = ({ autoCompleteState, autoCompleteDispatch, queryId }) => {
  const selectedServiceRef = useRef(null);
  const { resetMapStation } = useMapControls();

  const selectedService = autoCompleteState.selectedStations[queryId];

  const handleClick = () => {
    resetMapStation(selectedService, autoCompleteState.selectedStations);
    autoCompleteDispatch();
  };
  return (
    <>
      {/* Close disruption box */}
      <div
        className={`wmnds-grid wmnds-grid--justify-between wmnds-m-t-xs wmnds-m-b-md ${s.selectedStationBox}`}
        ref={selectedServiceRef}
      >
        <strong className={`wmnds-col-auto ${s.selectedSummary}`}>
          {selectedService.routeName || selectedService.stationName}
        </strong>

        <CloseButton onClick={handleClick} />
      </div>
    </>
  );
};

// PropTypes
SelectedServiceHeader.propTypes = {
  autoCompleteState: PropTypes.objectOf(PropTypes.any).isRequired,
  autoCompleteDispatch: PropTypes.func.isRequired,
  to: PropTypes.bool,
};

SelectedServiceHeader.defaultProps = {
  to: false,
};

export default SelectedServiceHeader;
