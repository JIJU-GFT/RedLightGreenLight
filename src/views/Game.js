import React from 'react';
import PropTypes from 'prop-types';

import redLight from '@images/redlight.png';
import greenLight from '@images/greenlight.png';

import GameButton from '@components/GameButton.js';
import GameService from '@services/gameService.js';
import { withRouter } from '../services/withRouter';

import { Numbers } from '@utils/constants.js';

var service;

// Game view
class Game extends React.Component {
  constructor(props) {
    super(props);
    // We initialize the state
    this.state = {
      username: localStorage.getItem('username'),
      score: Numbers.ZERO,
      highScore: Numbers.ZERO,
      lastClicked: 'none',
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

    var localScore = localUserData ? localUserData.score : Numbers.ZERO;
    var localHighestScore = localUserData ? localUserData.highScore : Numbers.ZERO;
    var localTrafficLightState = localUserData ? localUserData.isGreen : true;

    this.setState({
      score: localScore,
      highScore: localHighestScore,
      isGreen: localTrafficLightState,
    });

    service = new GameService(localScore, localTrafficLightState);
    window.addEventListener('itemInserted', (e) => this.storageChanged(e));
  }

  //  We use the lifecycle hook to store the data when the game is updated
  componentDidUpdate(prevProps, prevState) {
    // We compare previous and current state to prevent unexpected triggers due to React lifecycle
    if (prevState.isGreen !== this.state.isGreen) {
      this.state.isGreen ? service.startGreenTimer() : service.startRedTimer();
    }

    /**
     * ASK IF ITS REQUIRED TO STOP THE GAME AFTER LOSING ALL THE POINTS.
     * IF THE GAME SHOULD STOP, UNCOMMENT THE NEXT CONDITIONAL
     *
     * CURRENTLY THE GAME CONTINUES AFTER LOSING ALL THE POINTS.
     */
    // if (!prevState.isGreen && !this.state.isGreen) {
    //   service.stopAllTimers();
    // }

    this.saveGame();
  }

  // We stop all timers on exit or close
  componentWillUnmount() {
    service.stopAllTimers();
  }

  // Logic to handle the user's clicks
  handleClick(buttonPressed) {
    let step = buttonPressed === Numbers.STEP_LEFT ? 'Left' : 'Right';
    let score = this.state.score;
    let highest = this.state.highScore;

    if (this.state.isGreen) {
      this.state.lastClicked.localeCompare(step) === Numbers.ZERO && this.state.score > Numbers.ZERO
        ? score--
        : score++;
    } else {
      score = Numbers.ZERO;
    }

    if (score > highest) {
      highest = score;
    }

    // Updte score in store
    this.setState({
      lastClicked: step,
      score: score,
      highScore: highest,
    });

    // Update score in service
    service.setScore(score);
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
    var eventKey = e.key;
    if (eventKey.localeCompare('greenLight') === Numbers.ZERO) {
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
              this.props.navigate('/Home');
            }}
          />
        </div>
        <center>
          <h3>Hi, {this.state.username}.</h3>
          <h3>Highest Score: {this.state.highScore}.</h3>
        </center>
        <header className="App-header">
          {this.state.isGreen ? (
            <img src={greenLight} className="App-logo" alt="logo" />
          ) : (
            <img src={redLight} className="App-logo" alt="logo" />
          )}
        </header>
        <center>
          <h3>Score: {this.state.score}.</h3>
        </center>
        <div className="Game-body">
          <GameButton
            title="Left"
            buttonType="Game-button"
            onClick={() => this.handleClick(Numbers.STEP_LEFT)}
          />
          <GameButton
            title="Right"
            buttonType="Game-button"
            onClick={() => this.handleClick(Numbers.STEP_RIGHT)}
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
