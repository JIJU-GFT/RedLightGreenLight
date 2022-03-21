import React from 'react';
import { useNavigate } from 'react-router-dom';

import ScoreboardEntry from '@components/ScoreboardEntry.js';
import GameButton from '@components/GameButton.js';

import DataPersistanceService from '../services/dataPersistanceService';
import { STRINGS } from '@utils/constants.js';

function Scoreboard() {
  const navigate = useNavigate();
  const allHighScores = DataPersistanceService.loadLeaderboard();
  const scoreItems = [];

  for (let score = 0; score < allHighScores.length; score++) {
    scoreItems.push(allHighScores[score]);
  }

  function goBack() {
    navigate('/Home');
  }

  return (
    <div className="Scoreboard">
      <div className="Game-header">
        <GameButton
          title={STRINGS.EXIT}
          buttonType="Game-exit-button"
          onClick={() => goBack()}
        />
      </div>
      <center className="App-header">
        <h1>{STRINGS.HIGH_SCORES}</h1>
      </center>
      {scoreItems.map((key, entry) => {
        return <ScoreboardEntry key={key} scoreEntry={entry} />;
      })}
    </div>
  );
}

export default Scoreboard;
