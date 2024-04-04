// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsernameInput from './components/UsernameInput';
import Game from './components/game';
import Leaderboard from './components/leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsernameInput />} />
        <Route path="/UsernameInput" element={<UsernameInput />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
