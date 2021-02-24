import React from 'react';
import PropTypes from 'prop-types';
import s from './Icon.module.scss';

// Due to weird Protocol errors with external SVGs the svg use doesn't work well with production builds
// So we Ajax the SVG in with a snippet at the bottom of public/index.html

// Icons can be found at: https://designsystem.wmnetwork.co.uk/styles/icons/

const Icon = ({ className, iconName, size, color, title }) => {
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
};

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.oneOf(['cta', 'primary']),
};

Icon.defaultProps = {
  className: null,
  title: null,
  size: 20,
  color: null,
};

export default Icon;
