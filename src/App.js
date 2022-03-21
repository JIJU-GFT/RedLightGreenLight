import React from 'react';
import Home from '@views/Home.js';
import Game from '@views/Game.js';
import Scoreboard from '@views/Scoreboard.js';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  return (
    <Router basename="/RedLightGreenLight">
      <Routes>
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Game" element={<Game />} />
        <Route exact path="/Scoreboard" element={<Scoreboard />} />
        <Route path="*" element={<Navigate to="/Home" />} replace />
      </Routes>
    </Router>
  );
}

export default App;
