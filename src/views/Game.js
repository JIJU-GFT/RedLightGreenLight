import React from 'react';
import PropTypes from 'prop-types';

import redLight from '@images/redlight.png';
import greenLight from '@images/greenlight.png';

import GameButton from '@components/GameButton.js';
import GameService from '@services/gameService.js';
import { withRouter } from '../services/withRouter';

import { Numbers } from '@utils/constants.js';
import DataPersistanceService from '@services/dataPersistanceService.js';

let service;

// Game view
class Game extends React.Component {
  constructor(props) {
    super(props);
    // We initialize the state
    this.state = {
      username: DataPersistanceService.loadUserName('username'),
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
    let localUserData = DataPersistanceService.loadUserData(
      this.state.username
    );

    let localScore = localUserData ? localUserData.score : Numbers.ZERO;
    let localHighestScore = localUserData
      ? localUserData.highScore
      : Numbers.ZERO;
    let localTrafficLightState = localUserData ? localUserData.isGreen : true;

    this.setState({
      score: localScore,
      highScore: localHighestScore,
      isGreen: localTrafficLightState,
    });

    service = new GameService(localScore, localTrafficLightState);
    window.addEventListener('itemInserted', this.storageChanged);
  }

  //  We use the lifecycle hook to store the data when the game is updated
  componentDidUpdate(prevProps, prevState) {
    // We compare previous and current state to prevent unexpected triggers due to React lifecycle
    let stateHasChanged = prevState.isGreen !== this.state.isGreen;

    if (stateHasChanged && this.state.isGreen) {
      service.startGreenTimer();
    } else if (stateHasChanged && !this.state.isGreen) {
      service.startRedTimer();
    }
    this.saveGame();
  }

  // We stop all timers on exit or close
  componentWillUnmount() {
    service.stopAllTimers();
    window.removeEventListener('itemInserted', this.storageChanged);
  }

  // Logic to handle the user's clicks
  handleClick(buttonPressed) {
    let step = buttonPressed === Numbers.STEP_LEFT ? 'Left' : 'Right';
    let score = this.state.score;
    let highest = this.state.highScore;

    if (this.state.isGreen) {
      if (
        this.state.lastClicked.localeCompare(step) === Numbers.ZERO &&
        this.state.score > Numbers.ZERO
      ) {
        score--;
      } else {
        score++;
      }
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
    DataPersistanceService.saveUserData(this.state.username, userData);
  }

  // Listen to the trafficLight status in localStorage
  storageChanged(e) {
    let eventKey = e.key;
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
