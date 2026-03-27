/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';

import s from './Radio.module.scss';

const { sanitize } = dompurify;

function Radio({ name = '', onChange, text, value, info }) {
  return (
    <label className={`${s.radioContainer} wmnds-fe-radios__container`}>
      <div className={s.text} dangerouslySetInnerHTML={{ __html: sanitize(text) }} />
      <input
        className={`${s.radio} wmnds-fe-radios__input`}
        value={value}
        name={name}
        type="radio"
        onChange={onChange}
      />
      {info && (
        <div
          className={`${s.insetText} wmnds-inset-text wmnds-m-t-xs`}
          dangerouslySetInnerHTML={{ __html: sanitize(info) }}
        />
      )}
      <span className="wmnds-fe-radios__checkmark" />
    </label>
  );
}

Radio.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
};

Radio.defaultProps = {
  name: '',
  onChange: null,
  info: null,
};

export default Radio;
