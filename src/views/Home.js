import React from 'react';
import PropTypes from 'prop-types';

import logo from '../assets/images/squid.png';

import GameInput from '../components/GameInput.js';
import GameButton from '../components/GameButton.js';
import GameText from '../components/GameText.js';

import { NUMBERS, STRINGS } from '../utils/constants.js';

import DataPersistanceService from '../services/dataPersistanceService.js';
import { withRouter } from '../services/withRouter';

// Home view
class Home extends React.Component {
  constructor(props) {
    super(props);
    // We initialize the state
    this.state = {
      username: '',
      validUsername: true,
    };

    // We bind the class functions so they can be accessible
    this.updateUsername = this.updateUsername.bind(this);
    this.handleJoinClick = this.handleJoinClick.bind(this);
    this.handleScoreboardClick = this.handleScoreboardClick.bind(this);
  }

  // Updates the username value and validates it's length
  updateUsername(e) {
    this.setState({ username: e.target.value.trim() });
  }

  // Handles navigation on JOIN button, storing the username in localStorage
  handleJoinClick() {
    if (
      this.state.username &&
      this.state.username.length >= NUMBERS.USERNAME_LENGTH
    ) {
      DataPersistanceService.saveUserName(this.state.username.trim());
      this.props.navigate('/Game');
      this.setState({ validUsername: true });
    } else {
      this.setState({ validUsername: false });
    }
  }

  handleScoreboardClick() {
    this.props.navigate('/Scoreboard');
  }

  render() {
    return (
      <>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <center>
          <h1>Create a new player</h1>
        </center>
        <div className="Home-body">
          <GameInput id="input" sendDataToParent={this.updateUsername} />
          <GameButton
            id="join"
            buttonType="Home-button"
            title={STRINGS.JOIN}
            onClick={this.handleJoinClick}
          />
          <GameButton
            id="scores"
            buttonType="Home-button"
            title={STRINGS.SCORE_LEADERBOARD}
            onClick={this.handleScoreboardClick}
          />
          {!this.state.validUsername && (
            <GameText text={STRINGS.USERNAME_INVALID} textStyles="Error-text" />
          )}
        </div>
      </>
    );
  }
}
Home.propTypes = {
  navigate: PropTypes.func.isRequired,
};
export default withRouter(Home);
