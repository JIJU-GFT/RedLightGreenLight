import React from "react";
import PropTypes from "prop-types";

const GameButton = ({title, onClick}) => {
    return (
        <button onClick={onClick} className="App-button">{title}</button>
    );
};

GameButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default GameButton;