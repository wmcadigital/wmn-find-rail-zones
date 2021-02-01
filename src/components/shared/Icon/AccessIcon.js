import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import s from './Icon.module.scss';

const AccessIcon = ({ type, size, className, color }) => {
  return (
    <div
      className={`${s.accessIcon} ${type === 'full' ? s.fullAccess : s.partAccess}`}
      style={{ fontSize: `${size}px` }}
    >
      <Icon iconName="general-disabled" className={className} color={color} />
    </div>
  );
};

AccessIcon.propTypes = {
  type: PropTypes.arrayOf(PropTypes.oneOf(['full', 'part'])),
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.arrayOf(PropTypes.oneOf(['cta', 'primary'])),
};

AccessIcon.defaultProps = {
  type: 'full',
  className: null,
  size: 20,
  color: null,
};

export default AccessIcon;
