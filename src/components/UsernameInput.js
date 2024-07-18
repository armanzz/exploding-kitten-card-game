import React, { useState } from 'react';
import './style1.css'; // Assuming this is your CSS file for styling

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { startGame, setUsername as setReduxUsername } from '../redux/action'; // Adjust path as needed

const UsernameInput = (props) => {
  const [localUsername, setLocalUsername] = useState('');
  const navigate = useNavigate();

  const handleStartGame = async () => {
    navigate('/game');
    if (localUsername.trim() !== '') {
      try {
        await axios.post('http://localhost:8080/api/register', { username: localUsername });
        props.startGame();
        props.setReduxUsername(localUsername);
        navigate('/game'); // Navigate to the game page
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
     

     
      <div className="game-motive">
        <h2>Rules:</h2>
        <p>
         
          Players draw cards until someone draws a Bomb, they are out of the game unless they have a defuse card!
        </p>
        <p>Cat Card</p>
          <p>Bomb Card</p> 
          <p>Defuse Card</p>
          <p> Shuffle Card</p>
       
      </div>

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

export default connect(null, { startGame, setReduxUsername })(UsernameInput);
