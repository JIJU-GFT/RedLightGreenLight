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

  function sendDataToParent(e) {
    setUsername(e.target.value);
    e.target.value.length >= 3 ? setValidUsername(true) : setValidUsername(false);
  }

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
        <GameInput sendDataToParent={sendDataToParent} />
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
