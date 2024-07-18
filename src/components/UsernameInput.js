import React, { useState } from 'react';
import './style1.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {startGame, setUsername as setReduxUsername} from '../redux/action';

const UsernameInput = (props) => { // props parameter is added here
  const [localUsername, setLocalUsername] = useState('');
  const navigate = useNavigate();

  const handleStartGame = async () => {
    navigate('/game');
    if (localUsername.trim() !== '') {
      try {
        await axios.post('https://kittenbackend.onrender.com/api/register/api/register', { username: localUsername });
         // Call setUsername here
        props.startGame();

       // startGame action is dispatched here
        navigate('/game'); // Navigate to the game page
        props.setReduxUsername(localUsername); 
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      alert('Please enter a username');
    }
  };

  const handleViewLeaderboard = () => {
    navigate('/leaderboard'); // Navigate to the leaderboard
  };

  return (
    <div className="username-input-container">
        <h1 className="game-title">Exploding Kitten Game</h1> 
        
        <input
            className="username-input"
            type="text"
            placeholder="Enter username"
            value={localUsername}
            onChange={(e) => setLocalUsername(e.target.value)}
        />
        <button className="button" onClick={handleStartGame}>
            Start Game
        </button>
        <button className="button" onClick={handleViewLeaderboard}>
            View Leaderboard
        </button>
    </div>
);
};

export default connect(null, {startGame,setReduxUsername})(UsernameInput);
