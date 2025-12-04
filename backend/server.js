const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());
app.use(express.static('public'));

// Game database
const games = [
  {
    id: 1,
    name: "Super Mario Bros",
    description: "Classic platformer adventure",
    thumbnail: "/images/mario.png",
    gameUrl: "/games/mario",
    year: 1985,
    players: "1-2",
    genre: "Platformer"
  },
  {
    id: 2,
    name: "Pac-Man",
    description: "Eat dots and avoid ghosts",
    thumbnail: "/images/pacman.png",
    gameUrl: "/games/pacman",
    year: 1980,
    players: "1",
    genre: "Arcade"
  },
  {
    id: 3,
    name: "Space Invaders",
    description: "Defend Earth from alien invasion",
    thumbnail: "/images/spaceinvaders.png",
    gameUrl: "/games/spaceinvaders",
    year: 1978,
    players: "1-2",
    genre: "Shooter"
  },
  {
    id: 4,
    name: "Tetris",
    description: "Arrange falling blocks",
    thumbnail: "/images/tetris.png",
    gameUrl: "/games/tetris",
    year: 1984,
    players: "1",
    genre: "Puzzle"
  },
  {
    id: 5,
    name: "Snake",
    description: "Grow your snake without hitting walls",
    thumbnail: "/images/snake.png",
    gameUrl: "/games/snake",
    year: 1976,
    players: "1",
    genre: "Arcade"
  }
];

// Routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/games', (req, res) => {
  res.json({
    success: true,
    count: games.length,
    games: games
  });
});

app.get('/api/games/:id', (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ success: false, message: 'Game not found' });
  }
  res.json({ success: true, game });
});

app.get('/api/games/genre/:genre', (req, res) => {
  const filtered = games.filter(g => 
    g.genre.toLowerCase() === req.params.genre.toLowerCase()
  );
  res.json({ success: true, count: filtered.length, games: filtered });
});

// Game stats endpoint
app.post('/api/games/:id/play', (req, res) => {
  const game = games.find(g => g.id === parseInt(req.params.id));
  if (!game) {
    return res.status(404).json({ success: false, message: 'Game not found' });
  }
  
  // Here you would log play statistics
  console.log(`Game ${game.name} played at ${new Date().toISOString()}`);
  res.json({ success: true, message: 'Play logged' });
});

// Leaderboard endpoint
app.get('/api/leaderboard/:gameId', (req, res) => {
  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, player: "ACE", score: 99999 },
    { rank: 2, player: "PRO", score: 85000 },
    { rank: 3, player: "GXR", score: 72000 }
  ];
  res.json({ success: true, leaderboard });
});

app.post('/api/leaderboard/:gameId', (req, res) => {
  const { player, score } = req.body;
  // Here you would save to database
  res.json({ success: true, message: 'Score submitted' });
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎮 Retro Games Backend running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 API endpoint: http://localhost:${PORT}/api/games`);
});
