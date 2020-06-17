const express = require('express');

const playerRouter = express.Router();

const playerCtlr = require('../controllers/player-controller');

playerRouter.get('/players', playerCtlr.getPlayers);
playerRouter.get('/player/:id', playerCtlr.getPlayerById);
playerRouter.post('/createplayer', playerCtlr.createPlayer);
playerRouter.put('/player/:id', playerCtlr.updatePlayer);
playerRouter.delete('/player/:id', playerCtlr.deletePlayer);

module.exports = playerRouter;