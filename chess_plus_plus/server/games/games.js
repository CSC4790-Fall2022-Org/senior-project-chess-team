const boardState = require('./boardState.js')
var activeGames = {}

function Game(gameId, whiteUserId, blackUserId) {
    this.gameId = gameId;
    this.whiteUserId = whiteUserId;
    this.blackUserId = blackUserId;
    this.isWhiteTurn = true;
    this.whiteBoard = boardState.makeInitialBoard();
    this.blackBoard = boardState.makeInitialBoard();


    this.containsPlayer = id => this.whiteUserId === id || this.blackUserId === id;
    this.addPlayer = id => {
        this.whiteUserId = this.whiteUserId ?? id;
        this.blackUserId = this.blackUserId ?? id;
    }
    this.color = id => {
        return id === this.whiteUserId ? 'white' : 'black';
    }

    function makeMove(isWhite, move) {
        let board;
        if (isWhite) {
            board = this.whiteBoard;
        }
        else {
            board = this.blackBoard;
        }

        // do the move
    }
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
    return {'game_id': gameId};
}

const { v4: uuidv4 } = require('uuid');
const generateGameId = () => {
    return uuidv4(); // make this shorter
}

const getById = id => {
    return activeGames[id] ?? null;
}
exports.create = createGameRoom;
exports.getById = getById;