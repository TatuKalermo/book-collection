import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.scss';

const TextInput = ({ label, name, value, onChange, textArea }) => {
  return (
    <div className="form-group">
      <label>
        {label}
        {textArea ? (
          <textarea
            className="form-textarea"
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            className="form-input"
            name={name}
            type="text"
            value={value}
            onChange={onChange}
            required
          />
        )}
      </label>
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  textArea: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  name: '',
  value: '',
  textArea: false,
};

export default TextInput;
