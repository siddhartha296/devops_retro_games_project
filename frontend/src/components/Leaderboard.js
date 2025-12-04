import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedGame, setSelectedGame] = useState(1);
  const [loading, setLoading] = useState(true);

  const games = [
    { id: 1, name: 'Super Mario Bros' },
    { id: 2, name: 'Pac-Man' },
    { id: 3, name: 'Space Invaders' },
    { id: 4, name: 'Tetris' },
    { id: 5, name: 'Snake' }
  ];

  useEffect(() => {
    fetchLeaderboard(selectedGame);
  }, [selectedGame]);

  const fetchLeaderboard = async (gameId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/leaderboard/${gameId}`);
      setLeaderboard(response.data.leaderboard);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank) => {
    switch(rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '🏅';
    }
  };

  return (
    <div className="leaderboard-container">
      <h1 className="page-title">🏆 Leaderboard</h1>
      
      <div className="game-selector">
        <label htmlFor="game-select">Select Game:</label>
        <select 
          id="game-select"
          value={selectedGame} 
          onChange={(e) => setSelectedGame(parseInt(e.target.value))}
          className="game-select"
        >
          {games.map(game => (
            <option key={game.id} value={game.id}>
              {game.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading leaderboard...</p>
        </div>
      ) : (
        <div className="leaderboard-table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry.rank} className={`rank-${entry.rank}`}>
                  <td className="rank-cell">
                    <span className="medal">{getMedalEmoji(entry.rank)}</span>
                    {entry.rank}
                  </td>
                  <td className="player-cell">{entry.player}</td>
                  <td className="score-cell">{entry.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="leaderboard-info">
        <p>💡 Play games to submit your high scores!</p>
      </div>
    </div>
  );
};

export default Leaderboard;
