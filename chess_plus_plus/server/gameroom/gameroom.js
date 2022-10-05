var currGames = {}

const Game = (gameId, whiteUserId, blackUserId)

const createGameRoom = userId => {
    const gameId = generateGameId();
    console.log(gameId);
}

const { v4: uuidv4 } = require('uuid');
const generateGameId = () => {
    return uuidv4();
}

exports.create = createGameRoom