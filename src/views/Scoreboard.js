import React from 'react';
import PropTypes from 'prop-types';

import ScoreboardEntry from '../components/ScoreboardEntry.js';
import GameButton from '../components/GameButton.js';

import DataPersistanceService from '../services/dataPersistanceService';
import { withRouter } from '../services/withRouter';
import { STRINGS } from '../utils/constants.js';

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    // We initialize the state
    this.state = {
      allHighScores: DataPersistanceService.loadLeaderboard(),
    };

    // We bind the class functions so they can be accessible
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigate('/Home');
  }
  render() {
    return (
      <>
        <div className="exit-button-container">
          <GameButton
            id="exit"
            title={STRINGS.EXIT}
            buttonType="interaction-button exit-button"
            onClick={() => this.goBack()}
          />
        </div>
        <header className="app-header scoreboard-header">
          <h1>{STRINGS.HIGH_SCORES}</h1>
        </header>
        <div className="score-container">
          <div className="score-entry-title">
            <span className="column-title">{STRINGS.PLAYER}</span>
            <span className="column-title">{STRINGS.SCORE}</span>
          </div>
          {this.state.allHighScores.map((entry, key) => {
            return <ScoreboardEntry key={key} id={key} scoreEntry={entry} />;
          })}
        </div>
      </>
    );
  }
}

Scoreboard.propTypes = {
  navigate: PropTypes.func.isRequired,
};
export default withRouter(Scoreboard);
