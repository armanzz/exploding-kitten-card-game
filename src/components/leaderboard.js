import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style2.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get('https://kittenbackend.onrender.com/api/register/api/leaderboard')
      .then((response) => {
        setLeaderboard(response.data);
      })
      .catch((error) => {
        console.error('Error fetching leaderboard:', error);
      });
  }, []);

  return (
    <div className="leaderboard-container">
      <h2 className="leaderboard-title">Leaderboard</h2>
      <ul className="leaderboard-list">
        {leaderboard.map((entry, index) => (
          <li key={index} className="leaderboard-item">
            <span className="leaderboard-username">{entry.username}</span>: 
            <span className="leaderboard-wins">{entry.wins}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
