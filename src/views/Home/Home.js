import React, { useState } from "react";
import logo from "@images/squid.png";
import GameInput from "@components/GameInput.js";
import GameButton from "@components/GameButton.js";

function Home() {
  const [username, setUsername] = useState("");

  function sendDataToParent(e) {
    setUsername(e.target.value);
    console.log("User", username);
  }

  function handleClick() {
    console.log("Username on click", username);
  }

  return (
    <div className="Home">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Create a new player</h2>
      </header>
      <div className="App-body">
        <GameInput sendDataToParent={sendDataToParent} />
        <GameButton title="JOIN" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Home;
