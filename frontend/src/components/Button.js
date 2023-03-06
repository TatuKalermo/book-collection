import React from 'react';
import PropTypes from 'prop-types';

const SimpleButton = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

SimpleButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SimpleButton;
