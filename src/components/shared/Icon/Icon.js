import React from 'react';
import PropTypes from 'prop-types';

import s from './Icon.module.scss';

// Due to weird Protocol errors with external SVGs the svg use doesn't work well with production builds
// So we Ajax the SVG in with a snippet at the bottom of public/index.html

// Icons can be found at: https://designsystem.wmnetwork.co.uk/styles/icons/

const Icon = ({ className, iconName, size }) => {
  return (
    <svg className={`${s.icon} ${className}`} width={`${size}px`} height={`${size}px`}>
      <use xlinkHref={`#wmnds-${iconName}`} href={`#wmnds-${iconName}`} />
    </svg>
  );
};

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
};

Icon.defaultProps = {
  className: null,
  size: 20,
};

export default Icon;
