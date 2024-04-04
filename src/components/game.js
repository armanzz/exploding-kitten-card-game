import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { drawCard, startGame } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function Game({ deck, gameOver, defuses, drawnCard, drawCard, startGame, username }) {
  const [gameStatusMessage, setGameStatusMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const updateWins = async () => {
      try {
          // Make POST request to update user's wins
          await axios.post('https://kittenbackend.onrender.com/api/register/api/win', { username: username },  {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
      } catch (error) {
          console.error('Error updating wins:', error);
      }
  };

    if (gameOver) {
      setGameStatusMessage('Game Over! You got an EXPLODE!');
      setTimeout(() => {
        navigate("/UsernameInput"); // Redirect to username input page
      }, 3000); // Delay before navigation
    } else if (deck.length === 0) {
      setGameStatusMessage('Congratulations ' + username + '! You won!');
      // Make API request to update user's wins
      updateWins();
      setTimeout(() => {
        navigate("/UsernameInput"); // Redirect to username input page
      }, 3000); // Delay before navigation
    }
  }, [gameOver, deck, startGame, navigate, username]);

  const handleDrawCard = () => {
    drawCard();
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Exploding Kitten Game</h1>
      {gameOver || deck.length === 0 ? (
        <p className="game-status game-over-message">{gameStatusMessage}</p>) 
        : (
        <>
          <button className="button" onClick={handleDrawCard}>Draw Card</button>
          <p className="game-status remaining-cards">Remaining Cards: {deck.length}</p>
          <p className="game-status defuses-available">Defuses available: {defuses}</p>
          {drawnCard && <p className="game-status drawn-card">Drawn Card: {drawnCard}</p>}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  deck: state.deck,
  gameOver: state.gameOver,
  defuses: state.defuses,
  drawnCard: state.drawnCard,
  username: state.username,
});

const mapDispatchToProps = {
  drawCard,
  startGame,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
