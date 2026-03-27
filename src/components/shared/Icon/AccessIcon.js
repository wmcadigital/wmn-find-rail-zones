/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from './Icon';
import s from './Icon.module.scss';

// Customised icon which includes circular background for accessibility icon
export function AccessIcon({ type = 'full', size = 20, className = null, iconClassName = null }) {
  return (
    <div
      className={`${s.accessIcon} ${type === 'full' ? s.fullAccess : s.partAccess} ${className}`}
      style={{ fontSize: `${size}px` }}
    >
      <Icon iconName="general-disabled" className={iconClassName || ''} />
    </div>
  );
}

// eslint-disable-next-line react/require-default-props
AccessIcon.propTypes = {
  type: PropTypes.oneOf(['full', 'part']),
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  size: PropTypes.number,
};

export default AccessIcon;
