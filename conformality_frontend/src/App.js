import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
