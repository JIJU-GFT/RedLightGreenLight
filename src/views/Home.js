import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "@images/squid.png";

import GameInput from "@components/GameInput.js";
import GameButton from "@components/GameButton.js";
import GameText from "@components/GameText.js";

// Home view
function Home() {
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const navigate = useNavigate();

  // Updates the username value and validates it's length
  function updateUsername(e) {
    setUsername(e.target.value.trim());
  }

  // Handles navigation on JOIN button, storing the username in localStorage
  function handleClick() {
    if (username.length >= 3) {
      window.localStorage.setItem("username", username.trim());
      navigate("/game");
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }

  return (
    <div className="Home">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Create a new player</h2>
      </header>
      <div className="App-body">
        <GameInput sendDataToParent={updateUsername} />
        <GameButton
          buttonType="Home-button"
          title="JOIN"
          onClick={handleClick}
        />
        {!validUsername && (
          <GameText
            text="Username must not be blank and should be at least 3 characters long."
            textStyles="Error-text"
          />
        )}
        <h5>v 1.2</h5>
      </div>
    </div>
  );
}

export default Home;
