import React from "react";
import Home from "@views/Home.js";
import Game from "@views/Game.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/RedLightGreenLight" element={<Home/>}>
        </Route>
        <Route exact path="/Game" element={<Game/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
