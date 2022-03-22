import React from 'react';
import PropTypes from 'prop-types';

import { STRINGS } from '../utils/constants.js';

const GameInput = ({ sendDataToParent }) => {
  return (
    <input
      className="username-input"
      placeholder={STRINGS.USERNAME}
      onChange={sendDataToParent}
    />
  );
};

// Declare prop types
GameInput.propTypes = {
  sendDataToParent: PropTypes.func.isRequired,
};

export default GameInput;
