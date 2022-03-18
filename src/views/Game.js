import React from "react";
import { useLocation } from "react-router-dom";
import redLight from "@images/redlight.png";
import greenLight from "@images/greenlight.png";
import GameButton from "@components/GameButton.js";
import PropTypes from "prop-types";

function Game() {
  let { state } = useLocation();

  function handleClick() {}

  return (
    <div className="Home">
      <header className="App-header">
        <img src={redLight} className="App-logo" alt="logo" />
        <img src={greenLight} className="App-logo" alt="logo" />
        <h3>This is the game screen, {state.username}.</h3>
      </header>
      <div className="Game-body">
        <GameButton
          title="Left"
          buttonType="Game-button"
          onClick={handleClick}
        />
        <GameButton
          title="Right"
          buttonType="Game-button"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

Game.propTypes = {
  username: PropTypes.string,
};

export default Game;
