import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/shared/Icon/Icon';
import dompurify from 'dompurify';

const { sanitize } = dompurify;

const Message = ({ type, title, message, showRetry, retryCallback }) => {
  let iconName;
  switch (type) {
    case 'error':
      iconName = 'warning-triangle';
      break;

    default:
      iconName = 'success';
      break;
  }

  return (
    <div
      className={`wmnds-msg-summary wmnds-msg-summary--${type} wmnds-col-1 wmnds-m-t-lg wmnds-m-b-sm`}
    >
      <div className="wmnds-msg-summary__header">
        <Icon iconName={`general-${iconName}`} className="wmnds-msg-summary__icon" />
        <h3 className="wmnds-msg-summary__title">{title}</h3>
      </div>

      <div className="wmnds-msg-summary__info">
        <p className="wmnds-m-b-sm">{sanitize(message)}</p>
        {showRetry && (
          <button type="button" className="wmnds-btn wmnds-btn--link" onClick={retryCallback}>
            Retry search
          </button>
        )}
      </div>
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  showRetry: PropTypes.bool,
  retryCallback: PropTypes.func,
};

Message.defaultProps = {
  type: 'success',
  title: 'Good service',
  message: 'No incidents reported.',
  showRetry: false,
  retryCallback: null,
};

export default Message;
