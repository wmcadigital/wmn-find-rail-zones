import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import s from './Icon.module.scss';

// Customised icon which includes circular background for accessibility icon
const AccessIcon = ({ type, size, className, iconClassName }) => {
  return (
    <div
      className={`${s.accessIcon} ${type === 'full' ? s.fullAccess : s.partAccess} ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      <Icon iconName="general-disabled" className={iconClassName || ''} />
    </div>
  );
};

AccessIcon.propTypes = {
  type: PropTypes.oneOf(['full', 'part']),
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  size: PropTypes.number,
};

AccessIcon.defaultProps = {
  type: 'full',
  className: null,
  iconClassName: null,
  size: 20,
};

export default AccessIcon;
