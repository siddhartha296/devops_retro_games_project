import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import Leaderboard from './components/Leaderboard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/games`);
      setGames(response.data.games);
      setError(null);
    } catch (err) {
      setError('Failed to load games. Please try again later.');
      console.error('Error fetching games:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar">
            <div className="nav-container">
              <Link to="/" className="nav-logo">
                🎮 Retro Games Arcade
              </Link>
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Games</Link>
                </li>
                <li className="nav-item">
                  <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <GameList 
                  games={games} 
                  loading={loading} 
                  error={error} 
                />
              } 
            />
            <Route 
              path="/game/:id" 
              element={<GameDetail games={games} />} 
            />
            <Route 
              path="/leaderboard" 
              element={<Leaderboard />} 
            />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>© 2024 Retro Games Arcade | Built with React & Docker</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
