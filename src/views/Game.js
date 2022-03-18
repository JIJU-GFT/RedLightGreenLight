import React from "react";
import { useNavigate } from "react-router-dom";
import redLight from "@images/redlight.png";
import greenLight from "@images/greenlight.png";
import GameButton from "@components/GameButton.js";
import PropTypes from "prop-types";

function Game({username}) {
  const navigate = useNavigate();

  function handleClick() {
    console.log("Username on click", username);
    navigate("/game");
  }

  return (
    <div className="Home">
      <header className="App-header">
        <img src={redLight} className="App-logo" alt="logo" />
        <img src={greenLight} className="App-logo" alt="logo" />
        <h2>This is the game screen, {username} </h2>
      </header>
      <div className="Game-body">
        <GameButton title="Left" buttonType="Game-button" onClick={handleClick} />
        <GameButton title="Right" buttonType="Game-button" onClick={handleClick} />
      </div>
    </div>
  );
}

Game.propTypes = {
    username: PropTypes.string
};

export default Game;
