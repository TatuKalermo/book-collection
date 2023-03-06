import React from 'react';
import PropTypes from 'prop-types';

const SimpleButton = ({ id, children, onClick, disabled }) => {
  return (
    <button id={id} type="submit" disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

SimpleButton.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

SimpleButton.defaultProps = {
  disabled: false,
};

export default SimpleButton;
