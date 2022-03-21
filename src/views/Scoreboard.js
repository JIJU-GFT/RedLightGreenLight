import React from 'react';

import ScoreboardEntry from '@components/ScoreboardEntry.js';
import GameButton from '@components/GameButton.js';
import { useNavigate } from 'react-router-dom';

function Scoreboard() {
  const navigate = useNavigate();
  const allHighScores =
    JSON.parse(localStorage.getItem('highscore_scoreboard')) || [];
  const scoreItems = [];

  for (var score = 0; score < allHighScores.length; score++) {
    scoreItems.push(allHighScores[score]);
  }

  function goBack() {
    navigate('/Home');
  }

  return (
    <div className="Scoreboard">
      <div className="Game-header">
        <GameButton
          title="Return"
          buttonType="Game-exit-button"
          onClick={() => goBack()}
        />
      </div>
      <center className="App-header">
        <h1>Highest Scores</h1>
      </center>
      {scoreItems.map((key, entry) => {
        return <ScoreboardEntry key={key} scoreEntry={entry} />;
      })}
    </div>
  );
}

export default Scoreboard;
