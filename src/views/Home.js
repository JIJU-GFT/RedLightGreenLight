import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '@images/squid.png';

import GameInput from '@components/GameInput.js';
import GameButton from '@components/GameButton.js';
import GameText from '@components/GameText.js';

import { NUMBERS, STRINGS } from '@utils/constants.js';
import DataPersistanceService from '@services/dataPersistanceService.js';

// Home view
function Home() {
  const [username, setUsername] = useState();
  const [validUsername, setValidUsername] = useState(true);
  const navigate = useNavigate();

  // Updates the username value and validates it's length
  function updateUsername(e) {
    setUsername(e.target.value.trim());
  }

  // Handles navigation on JOIN button, storing the username in localStorage
  function handleJoinClick() {
    if (username && username.length >= NUMBERS.USERNAME_LENGTH) {
      DataPersistanceService.saveUserName(username.trim());
      navigate('/Game');
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }

  function handleScoreboardClick() {
    navigate('/Scoreboard');
  }

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <center>
        <h1>Create a new player</h1>
      </center>
      <div className="Home-body">
        <GameInput sendDataToParent={updateUsername} />
        <GameButton
          buttonType="Home-button"
          title={STRINGS.JOIN}
          onClick={handleJoinClick}
        />
        <GameButton
          buttonType="Home-button"
          title={STRINGS.SCORE_LEADERBOARD}
          onClick={handleScoreboardClick}
        />
        {!validUsername && (
          <GameText text={STRINGS.USERNAME_INVALID} textStyles="Error-text" />
        )}
        <footer>v 1.5</footer>
      </div>
    </>
  );
}

export default Home;
