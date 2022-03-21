import React from 'react';
import { useNavigate } from 'react-router-dom';

import ScoreboardEntry from '@components/ScoreboardEntry.js';
import GameButton from '@components/GameButton.js';

import DataPersistanceService from '../services/dataPersistanceService';
import { STRINGS } from '@utils/constants.js';

function Scoreboard() {
  const navigate = useNavigate();
  const allHighScores = DataPersistanceService.loadLeaderboard();

  console.log('all scores', allHighScores);

  function goBack() {
    navigate('/Home');
  }

  return (
    <>
      <div className="Game-header">
        <GameButton
          title={STRINGS.EXIT}
          buttonType="Game-exit-button"
          onClick={() => goBack()}
        />
      </div>
      <header className="App-header">
        <h1>{STRINGS.HIGH_SCORES}</h1>
      </header>
      <div className="Score-body">
        <div className='Score-entry-title'>
          <span className='title'>{STRINGS.PLAYER}</span>
          <span className='title'>{STRINGS.SCORE}</span>
        </div>
        {allHighScores.map((entry, key) => {
          console.log('Score entry', key, entry);
          return <ScoreboardEntry key={key} id={key} scoreEntry={entry} />;
        })}
      </div>
    </>
  );
}

export default Scoreboard;
