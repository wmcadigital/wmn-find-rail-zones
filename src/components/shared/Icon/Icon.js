/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import s from './Icon.module.scss';

// Due to weird Protocol errors with external SVGs the svg use doesn't work well with production builds
// So we Ajax the SVG in with a snippet at the bottom of public/index.html

// Icons can be found at: https://designsystem.wmnetwork.co.uk/styles/icons/
export function Icon({ className = null, iconName, size = 20, color = null, title = null }) {
  return (
    <svg
      className={`${className} ${(color && s[color]) || ''}`}
      width={`${size}px`}
      height={`${size}px`}
    >
      {title && <title>{title}</title>}
      <use xlinkHref={`#wmnds-${iconName}`} href={`#wmnds-${iconName}`} />
    </svg>
  );
}

// eslint-disable-next-line react/require-default-props
Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.oneOf(['cta', 'primary']),
};

export default Icon;
