import React from 'react';
import PropTypes from 'prop-types';

const SimpleButton = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

SimpleButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SimpleButton;
