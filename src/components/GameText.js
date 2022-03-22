import React from 'react';
import PropTypes from 'prop-types';

const GameText = ({ text, textStyles }) => {
  return <p className={textStyles ? textStyles : 'defaultText'}>{text}</p>;
};

GameText.propTypes = {
  text: PropTypes.string.isRequired,
  textStyles: PropTypes.string,
};

export default GameText;
