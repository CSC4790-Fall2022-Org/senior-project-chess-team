var activeGames = {}

function Game(gameId, whiteUserId, blackUserId) {
    this.gameId = gameId;
    this.whiteUserId = whiteUserId;
    this.blackUserId = blackUserId;
    this.isWhiteTurn;
    this.board = GameBoard();
}

function GameBoard() {
    this.state = [[0]] // 2d array representing board;
    this.whiteKingInCheck = false;
    this.blackKingInCheck = false;
}



const getRandomColor = () => {
    return Math.floor(Math.random() * 2);
}
const createGameRoom = userId => {
    const gameId = generateGameId();
    const playerIsWhite = getRandomColor();
    let newGame = new Game(gameId, (playerIsWhite) ? userId : null,  (!playerIsWhite) ? userId : null)
     // otherId will come when user joins game w/ game id
    activeGames[gameId] = newGame;
}

const { v4: uuidv4 } = require('uuid');
const generateGameId = () => {
    return uuidv4(); // make this shorter
}

exports.create = createGameRoom