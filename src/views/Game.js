import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import redLight from "@images/redlight.png";
import greenLight from "@images/greenlight.png";
import GameButton from "@components/GameButton.js";

function Game() {
  // Loading the navigation parameters
  let { state } = useLocation();

  const [lastClicked, setLastClicked] = useState("none");
  const [score, setScore] = useState();


  // Will reset last step if the user loses the points so they can start anew
  function handleClick(buttonPressed) {
    let step = buttonPressed == 0 ? "Left" : "Right";

    if (lastClicked === "none") {
      setLastClicked(step);
      setScore(1);
    } else if (lastClicked.localeCompare(step) === 0) {
      setScore(previousScore => previousScore - 1);
    } else {
      setLastClicked(step);
      setScore((prevScore) => prevScore + 1);
    }
  }

  return (
    <div className="Home">
      <header className="App-header">
        <img src={redLight} className="App-logo" alt="logo" />
        <img src={greenLight} className="App-logo" alt="logo" />
        <h3>This is the game screen, {state.username}.</h3>
        <h3>Score: {score}.</h3>
        <h3>Last clicked: {lastClicked}.</h3>
      </header>
      <div className="Game-body">
        <GameButton
          title="Left"
          buttonType="Game-button"
          onClick={() => handleClick(0)}
        />
        <GameButton
          title="Right"
          buttonType="Game-button"
          onClick={() => handleClick(1)}
        />
      </div>
    </div>
  );
}

export default Game;
