import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ label, value, onChange, textArea }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {textArea ? (
        <textArea className="form-textarea" value={value} onChange={onChange} />
      ) : (
        <input
          className="form-input"
          type="text"
          value={value}
          onChange={onChange}
          required
        />
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  textArea: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextInput;
