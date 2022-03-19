import React from "react";
import redLight from "@images/redlight.png";
import greenLight from "@images/greenlight.png";
import GameButton from "@components/GameButton.js";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),
      score: localStorage.getItem(this.username)
        ? JSON.parse(localStorage.getItem(this.username)).score
        : 0,
      lastClicked: "none",
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(buttonPressed) {
    let step = buttonPressed == 0 ? "Left" : "Right";

    if (this.state.lastClicked === "none") {
      this.setState({ lastClicked: step, score: 1 });
    } else if (
      this.state.lastClicked.localeCompare(step) === 0 &&
      this.state.score > 0
    ) {
      this.setState((prevState) => ({ score: prevState.score - 1 }));
    } else {
      this.setState((prevState) => ({
        lastClicked: step,
        score: prevState.score + 1,
      }));
    }
  }

  render() {
    console.log(this.state.username, this.state.score);
    console.log("Step", this.state.lastClicked);
    return (
      <div className="Home">
        <header className="App-header">
          <img src={redLight} className="App-logo" alt="logo" />
          <img src={greenLight} className="App-logo" alt="logo" />
          <h3>This is the game screen, {this.state.username}.</h3>
          <h3>Score: {this.state.score}.</h3>
          <h3>Last clicked: {this.state.lastClicked}.</h3>
        </header>
        <div className="Game-body">
          <GameButton
            title="Left"
            buttonType="Game-button"
            onClick={() => this.handleClick(0)}
          />
          <GameButton
            title="Right"
            buttonType="Game-button"
            onClick={() => this.handleClick(1)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
