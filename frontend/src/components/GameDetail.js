import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GameDetail.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const GameDetail = ({ games }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const foundGame = games.find(g => g.id === parseInt(id));
    if (foundGame) {
      setGame(foundGame);
      logGamePlay(foundGame.id);
    }
  }, [id, games]);

  const logGamePlay = async (gameId) => {
    try {
      await axios.post(`${API_URL}/api/games/${gameId}/play`);
    } catch (err) {
      console.error('Error logging game play:', err);
    }
  };

  const handleStartGame = () => {
    setIsPlaying(true);
    setScore(0);
  };

  const handleEndGame = () => {
    setIsPlaying(false);
    alert(`Game Over! Your score: ${score}`);
  };

  if (!game) {
    return <div className="loading-container">Loading game...</div>;
  }

  return (
    <div className="game-detail-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Back to Games
      </button>

      <div className="game-detail-content">
        <div className="game-header">
          <h1 className="game-title">{game.name}</h1>
          <div className="game-badges">
            <span className="badge">{game.genre}</span>
            <span className="badge">{game.year}</span>
            <span className="badge">👥 {game.players}</span>
          </div>
        </div>

        <p className="game-full-description">{game.description}</p>

        <div className="game-play-area">
          {!isPlaying ? (
            <div className="game-start-screen">
              <div className="game-icon-large">🎮</div>
              <h2>Ready to Play?</h2>
              <p>Press Start to begin your adventure!</p>
              <button onClick={handleStartGame} className="start-button">
                Start Game
              </button>
            </div>
          ) : (
            <div className="game-canvas">
              <div className="game-screen">
                <h3>🎮 Game Running...</h3>
                <p>Score: {score}</p>
                <div className="game-placeholder">
                  <p>Game canvas would be here</p>
                  <p>Implement actual game logic using HTML5 Canvas or game library</p>
                </div>
                <div className="game-controls">
                  <button onClick={() => setScore(score + 100)}>
                    Add Score (+100)
                  </button>
                  <button onClick={handleEndGame} className="end-button">
                    End Game
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="game-instructions">
          <h3>How to Play</h3>
          <ul>
            <li>Use arrow keys to move</li>
            <li>Press spacebar to jump/action</li>
            <li>Collect items to increase your score</li>
            <li>Avoid obstacles and enemies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
