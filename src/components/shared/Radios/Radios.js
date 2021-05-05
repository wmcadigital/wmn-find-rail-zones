import React from 'react';
import PropTypes from 'prop-types';
import dompurify from 'dompurify';
// Import components
import Radio from './Radio/Radio';

import s from './Radios.module.scss';

const { sanitize } = dompurify;

const Radios = ({ name, hint, question, error, radios, onChange }) => {
  return (
    <div className="wmnds-fe-group wmnds-m-b-md">
      <fieldset className="wmnds-fe-fieldset">
        <legend className="wmnds-fe-fieldset__legend">
          <h2 className="wmnds-fe-question">{question}</h2>
          {hint && <p className={s.hint}>{hint}</p>}
        </legend>
        <div className={`wmnds-fe-radios${error ? ' wmnds-fe-group--error' : ''}`}>
          {/* If there is an error, show here */}
          {error && (
            <span
              className="wmnds-fe-error-message"
              dangerouslySetInnerHTML={{
                __html: sanitize(error.message),
              }}
            />
          )}
          {/* Loop through radios and display each radio button */}
          {radios.map(({ text, html, value, info }) => (
            <Radio
              key={text}
              name={name}
              text={html || text}
              value={value}
              onChange={onChange}
              info={info}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
};

Radios.propTypes = {
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  question: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  radios: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      onChange: PropTypes.func,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      info: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func,
};

Radios.defaultProps = {
  question: null,
  onChange: null,
  error: null,
  hint: null,
};

export default Radios;
