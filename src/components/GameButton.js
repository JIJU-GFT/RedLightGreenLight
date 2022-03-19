import React from "react";
import PropTypes from "prop-types";

const GameButton = ({title, onClick, buttonType, disabled}) => {
    return (
        <button disabled={disabled} onClick={onClick} className={buttonType}>{title}</button>
    );
};

GameButton.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    buttonType: PropTypes.string.isRequired,
    disabled: PropTypes.bool
};

export default GameButton;