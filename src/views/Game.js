import React from "react";
import PropTypes from "prop-types";

import redLight from "@images/redlight.png";
import greenLight from "@images/greenlight.png";

import GameButton from "@components/GameButton.js";
import GameService from "@services/gameService.js";
import { withRouter } from "../services/withRouter";

var service;

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
      isGreen: true,
    };

    // We bind the class functions so they can be accessible
    this.handleClick = this.handleClick.bind(this);
    this.saveGame = this.saveGame.bind(this);
    this.storageChanged = this.storageChanged.bind(this);
  }

  // We use the lifecycle hook to load the saved scores and game state
  componentDidMount() {
    var localUserData =
      localStorage.getItem(this.state.username) &&
      JSON.parse(localStorage.getItem(this.state.username));

    var localScore = localUserData ? localUserData.score : 0;
    var localHighestScore = localUserData ? localUserData.highScore : 0;
    var localTrafficLightState = localUserData ? localUserData.isGreen : true;

    this.setState({
      score: localScore,
      highScore: localHighestScore,
      isGreen: localTrafficLightState,
    });

    service = new GameService(this.state.score, localTrafficLightState);
    window.addEventListener("itemInserted", (e) => this.storageChanged(e));
  }

  //  We use the lifecycle hook to store the data when the game is updated
  componentDidUpdate() {
    this.saveGame();
  }

  componentWillUnmount() {
    service.stopTimer();
  }

  // Logic to handle the user's clicks
  handleClick(buttonPressed) {
    let step = buttonPressed == 0 ? "Left" : "Right";
    let score = this.state.score;
    let highest = this.state.highScore;

    if (this.state.isGreen) {
      this.state.lastClicked.localeCompare(step) === 0 && this.state.score > 0
        ? score--
        : score++;
    } else {
      score = 0;
    }

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
      isGreen: this.state.isGreen,
    };
    localStorage.setItem(this.state.username, JSON.stringify(userData));
  }

  // Listen to the trafficLight status in localStorage
  storageChanged(e) {
    // console.log("Storage changed", e);
    var eventKey = e.key;
    if (eventKey.localeCompare("greenLight") == 0) {
      this.setState({ isGreen: e.value });
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="Game-header">
          <GameButton
            title="Exit"
            buttonType="Game-exit-button"
            onClick={() => {
              this.props.navigate("/Home");
            }}
          />
        </div>
        <header className="App-header">
          {this.state.isGreen ? (
            <img src={greenLight} className="App-logo" alt="logo" />
          ) : (
            <img src={redLight} className="App-logo" alt="logo" />
          )}
        </header>
        <center>
          <h3>Seconds: {this.state.seconds}</h3>
          <h3>Highest Score: {this.state.highScore}.</h3>
          <h3>This is the game screen, {this.state.username}.</h3>
          <h3>Score: {this.state.score}.</h3>
          <h3>Last clicked: {this.state.lastClicked}.</h3>
        </center>
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
