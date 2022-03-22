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
        <header className="app-header">
          <img src={logo} className="logo" alt="logo" />
          <p className="welcome-title">
            Welcome to <br />
            Red Light, Green Light
          </p>
        </header>
        <div className="homescreen-body">
          <p>Create a new player</p>
          <GameInput id="input" sendDataToParent={this.updateUsername} />
          <GameButton
            id="join"
            buttonType="interaction-button"
            title={STRINGS.JOIN}
            onClick={this.handleJoinClick}
          />
          <GameButton
            id="scores"
            buttonType="interaction-button"
            title={STRINGS.SCORE_LEADERBOARD}
            onClick={this.handleScoreboardClick}
          />
        </div>
        {!this.state.validUsername && (
          <GameText text={STRINGS.USERNAME_INVALID} textStyles="error-text" />
        )}
      </>
    );
  }
}
Home.propTypes = {
  navigate: PropTypes.func.isRequired,
};
export default withRouter(Home);
