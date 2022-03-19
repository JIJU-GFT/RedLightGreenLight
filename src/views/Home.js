import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@images/squid.png";
import GameInput from "@components/GameInput.js";
import GameButton from "@components/GameButton.js";

// Home view 
function Home() {
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const navigate = useNavigate();

  // Updates the username value and validates it's length
  function updateUsername(e) {
    setUsername(e.target.value);
    e.target.value.length >= 3 ? setValidUsername(true) : setValidUsername(false);
  }

  // Handles navigation on JOIN button, storing the username in localStorage
  function handleClick() {
    if (username.length >= 3) {
      window.localStorage.setItem("username", username);
      navigate("/game");
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
          disabled={!validUsername}
          buttonType="Home-button"
          title="JOIN"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Home;
