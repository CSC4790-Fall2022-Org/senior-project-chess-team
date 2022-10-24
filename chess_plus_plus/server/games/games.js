const boardState = require('./boardState.js')
var activeGames = {}

function Game(gameId, whiteUserId, blackUserId) {
    this.gameId = gameId;
    this.whiteUserId = whiteUserId;
    this.blackUserId = blackUserId;
    this.isWhiteTurn = true;
    this.whiteBoard = new boardState.BoardState(true);
    this.blackBoard = new boardState.BoardState(false);


    this.containsPlayer = id => this.whiteUserId === id || this.blackUserId === id;
    this.addPlayer = id => {
        this.whiteUserId = this.whiteUserId ?? id;
        this.blackUserId = this.blackUserId ?? id;
    }
    this.color = id => {
        return id === this.whiteUserId ? 'white' : 'black';
    }

    this.makeMove = (isWhite, move) => {
        console.log(move)
        let board;
        if (isWhite) {
            this.whiteBoard.movePiece(move.src, move.dest)
            this.blackBoard.board = rotated(this.whiteBoard.board)

            // make move on white board normally
            // set black board to be inverted version
        }
        else {
            this.blackBoard.movePiece(move.src, move.dest)
            this.whiteBoard.board = rotated(this.blackBoard.board)
        }
        // do the move
    }
}

const rotated = board => {
    new_board = []
    for (let i = 0; i < board.length; i++) {
        new_board[i] = board[i].slice();
    }

    new_board.reverse().forEach(function(arr) { arr.reverse })
    return new_board

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
exports.Game = Game