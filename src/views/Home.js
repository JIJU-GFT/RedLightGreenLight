import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@images/squid.png";
import GameInput from "@components/GameInput.js";
import GameButton from "@components/GameButton.js";

function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function sendDataToParent(e) {
    setUsername(e.target.value);
    console.log("User", username);
  }

  function handleClick() {
    console.log("Username on click", username);
    navigate("/game");
  }

  return (
    <div className="Home">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Create a new player</h2>
      </header>
      <div className="App-body">
        <GameInput sendDataToParent={sendDataToParent} />
        <GameButton buttonType="Home-button" title="JOIN" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Home;
