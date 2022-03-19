import React from "react";
import redLight from "@images/redlight.png";
import greenLight from "@images/greenlight.png";
import GameButton from "@components/GameButton.js";

// Game view
class Game extends React.Component {
  constructor(props) {
    super(props);
    // We initialize the state
    this.state = {
      username: localStorage.getItem("username"),
      score: 0,
      lastClicked: "none",
    };

    // We bind the class functions so they can be accessible
    this.handleClick = this.handleClick.bind(this);
    this.saveGame = this.saveGame.bind(this);
  }

  // We use the lifecycle hook to load the saved scores and game state
  componentDidMount() {
    var localScore = localStorage.getItem(this.state.username)
      ? JSON.parse(localStorage.getItem(this.state.username)).score
      : 0;

    this.setState({ score: localScore });
  }

  //  We use the lifecycle hook to store the data when the game is updated
  componentDidUpdate() {
    this.saveGame();
  }

  // Logic to handle the user's clicks
  handleClick(buttonPressed) {
    let step = buttonPressed == 0 ? "Left" : "Right";

    if (this.state.lastClicked === "none") {
      this.setState((prevState) => ({
        lastClicked: step,
        score: prevState.score + 1,
      }));
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

  // We store the current game state data in localStorage
  saveGame() {
    let userData = {
      username: this.state.username,
      score: this.state.score,
    };
    localStorage.setItem(this.state.username, JSON.stringify(userData));
  }

  render() {
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
