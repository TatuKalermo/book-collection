import React from 'react';
import PropTypes from 'prop-types';

const SimpleButton = ({ id, children, disabled }) => {
  return (
    <button id={id} type="submit" disabled={disabled}>
      {children}
    </button>
  );
};

SimpleButton.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

SimpleButton.defaultProps = {
  disabled: false,
};

export default SimpleButton;
