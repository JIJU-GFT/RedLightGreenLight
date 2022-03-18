import React from "react";
import Home from "@views/Home/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/RedLightGreenLight" element={<Home/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
