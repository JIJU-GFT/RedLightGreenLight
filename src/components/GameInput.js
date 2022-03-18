import React from "react";
import PropTypes from "prop-types";

const GameInput = ({ sendDataToParent }) => {
  return (
    <input
      className="User-input"
      placeholder="Username"
      onChange={sendDataToParent}
    />
  );
};

// Declare prop types
GameInput.propTypes = {
  sendDataToParent: PropTypes.func.isRequired,
};

export default GameInput;
