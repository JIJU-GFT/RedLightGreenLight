import React from "react";
import PropTypes from "prop-types";

import redLight from "@images/redlight.png";
import greenLight from "@images/greenlight.png";

import GameButton from "@components/GameButton.js";
import GameService from "@services/gameService.js";
import { withRouter } from "../services/withRouter";

// Game view
class Game extends React.Component {
  constructor(props) {
    super(props);
    // We initialize the state
    this.state = {
      username: localStorage.getItem("username"),
      score: 0,
      highScore: 0,
      lastClicked: "none",
    };

    // We bind the class functions so they can be accessible
    this.handleClick = this.handleClick.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  // We use the lifecycle hook to load the saved scores and game state
  componentDidMount() {
    var localUserData = localStorage.getItem(this.state.username);

    var localScore = localUserData
      ? JSON.parse(localStorage.getItem(this.state.username)).score
      : 0;

    var localHighestScore = localUserData
      ? JSON.parse(localStorage.getItem(this.state.username)).highScore
      : 0;

    this.setState({ score: localScore, highScore: localHighestScore });
  }

  //  We use the lifecycle hook to store the data when the game is updated
  componentDidUpdate() {
    var service = new GameService(this.state.score);
    service.timer();
    this.saveGame();
  }

  // Logic to handle the user's clicks
  handleClick(buttonPressed) {
    let step = buttonPressed == 0 ? "Left" : "Right";
    let score = this.state.score;
    let highest = this.state.highScore;

    this.state.lastClicked.localeCompare(step) === 0 && this.state.score > 0
      ? score--
      : score++;

    if (score > highest) {
      highest = score;
    }

    this.setState({
      lastClicked: step,
      score: score,
      highScore: highest,
    });
  }

  // We store the current game state data in localStorage
  saveGame() {
    let userData = {
      username: this.state.username,
      score: this.state.score,
      highScore: this.state.highScore,
    };
    localStorage.setItem(this.state.username, JSON.stringify(userData));
  }

  navigate(path) {
    this.props.navigate(path);
  }

  render() {
    return (
      <div className="Home">
        <div className="Game-header">
          <GameButton
            title="Exit"
            buttonType="Game-exit-button"
            onClick={() => {
              this.navigate("/RedLightGreenLight");
            }}
          />
        </div>
        <header className="App-header">
          <img src={redLight} className="App-logo" alt="logo" />
          <img src={greenLight} className="App-logo" alt="logo" />
          <h3>Highest Score: {this.state.highScore}.</h3>
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

Game.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default withRouter(Game);