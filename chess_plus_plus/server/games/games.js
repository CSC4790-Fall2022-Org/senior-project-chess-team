const boardState = require('./boardState.js')
const { getRandomSquare } = require('../randomness/squareSelector')
const cardProvider = require('../randomness/cardProvider')

var activeGames = {}

function Game(gameId, whiteUserId, blackUserId) {
    this.gameId = gameId;
    this.whiteUserId = whiteUserId;
    this.blackUserId = blackUserId;
    this.whiteUserSocketId = null;
    this.blackuserSocketId = null;
    this.whiteBoard = new boardState.BoardState(true);
    this.blackBoard = new boardState.BoardState(false);
    this.whiteSpecialSquare = null
    this.blackSpecialSquare = null
    this.whiteCards = []
    this.blackCards = []
    this.cardProvider = new CardProvider()

    this.containsPlayer = id => this.whiteUserId === id || this.blackUserId === id;
    this.addPlayer = id => {
        this.whiteUserId = this.whiteUserId ?? id;
        this.blackUserId = this.blackUserId ?? id;
    }
    this.color = id => {
        if (id === this.whiteUserId) {
            return 'white'
        }
        if (id === this.blackUserId) {
            return 'black';
        }
        return 'spectator'
    }

    this.makeMove = (isWhite, move) => {
        if (isWhite) {
            // if (!this.whiteBoard.canMovePiece(move.src, move.dest)) {
            //     console.log("can move on frontend but not server... huh")
            // }
            // else {
            //     this.whiteBoard.movePiece(move.src, move.dest)
            // }
            this.whiteBoard.movePiece(move.src, move.dest)
            this.blackBoard.blackKingInCheck = this.whiteBoard.blackKingInCheck
            this.blackBoard.whiteKingInCheck = this.whiteBoard.whiteKingInCheck
            this.blackBoard.board = rotated(this.whiteBoard.board)

            // make move on white board normally
            // set black board to be inverted version
        }
        else {
            // if (!this.blackBoard.canMovePiece(move.src, move.dest)) {
            //     console.log("can move on frontend but not server... huh")
            // }
            // else {
            //     this.blackBoard.movePiece(move.src, move.dest)
            // }
            this.blackBoard.movePiece(move.src, move.dest)

            this.whiteBoard.blackKingInCheck = this.blackBoard.blackKingInCheck
            this.whiteBoard.whiteKingInCheck = this.blackBoard.whiteKingInCheck
            this.whiteBoard.board = rotated(this.blackBoard.board)
        }
        this.handleMoveToSpecialSquare(isWhite, move.dest)
        this.flipTurns()
        this.updateMovesOnBoards()
        this.generateRandomSquare()
        // do the move
    }

    this.promotePawn = (isWhite, pieceType, squareCoords) => {
        if (isWhite) {
            this.whiteBoard.promotePawn(pieceType, squareCoords)
            this.blackBoard.board = rotated(this.whiteBoard.board)
        }
        else {
            this.blackBoard.promotePawn(pieceType, squareCoords)
            this.whiteBoard.board = rotated(this.blackBoard.board)
        }

        this.updateMovesOnBoards()
    }

    this.flipTurns = () => {
        this.whiteBoard.isWhiteTurn = !this.whiteBoard.isWhiteTurn
        this.blackBoard.isWhiteTurn = !this.blackBoard.isWhiteTurn
    }

    this.checkIfMoveToSpecialSquare = (isWhite, square) => {
        return square === (isWhite ? this.whiteSpecialSquare : this.blackSpecialSquare)
    }

    this.handleMoveToSpecialSquare = (isWhite, square) => {
        if (!this.checkIfMoveToSpecialSquare(isWhite, square)) {
            return 
        }
        const newCard = this.cardProvider.getCard();
        console.log(newCard)
        if (isWhite) {
            newCard.id = nextId(this.whiteCards)
            console.log(newCard)
            this.whiteCards.push(newCard)
        }
        else {
            newCard.id = nextId(this.blackCards)
            console.log(newCard)

            this.blackCards.push(newCard)
        }
    }
    this.opponentInCheckMate = (isWhite) => {
        let board = isWhite ? this.blackBoard : this.whiteBoard;
        // First check for check to save time
        console.log("white check status:", board.whiteKingInCheck)
        console.log("black check status:", board.blackKingInCheck)
        if (isWhite ? board.blackKingInCheck : board.whiteKingInCheck) {
            // Then check for subset of check (checkmate) when they cant move
            if (!board.playerCanMove()) {
                return true;
            }
        }
        return false;
    }

    this.addSocketId = (userName, socketId) => {
        if (userName === this.whiteUserId) {
            this.whiteUserSocketId = socketId;
            return true;
        }
        else {
            this.blackUserSocketId = socketId;    
            return true;
        }
        return false;
    }

    this.updateMovesOnBoards = () => {
        this.whiteBoard.updateAllMoves()
        this.blackBoard.updateAllMoves()
    }

    this.generateRandomSquare = () => {
        const nextTurn = this.whiteBoard.isWhiteTurn;
        let nextPlayerBoardState = nextTurn ? this.whiteBoard : this.blackBoard
        const randomSquare = getRandomSquare(nextPlayerBoardState);
        const squareForOtherPlayer = invertPosition(randomSquare);

        this.whiteSpecialSquare = nextTurn ? randomSquare : squareForOtherPlayer
        this.blackSpecialSquare = nextTurn ? squareForOtherPlayer : randomSquare

    }

    this.playCard = (color, cardId) => {
        let idx;
        if (color === 'white') {
            idx = findCardWithId(this.whiteCards, cardId)
            this.whiteCards[idx].action(this.whiteBoard)
            this.whiteCards.splice(idx, 1)
            this.blackBoard.board = rotated(this.whiteBoard.board)
        }
        else {
            idx = findCardWithId(this.blackCards, cardId)
            console.log(this.blackCards[idx])
            this.blackCards[idx].action(this.blackBoard)
            this.blackCards.splice(idx, 1)
            this.whiteBoard.board = rotated(this.blackBoard.board)
        }
        
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
const { CardProvider } = require('../randomness/cardProvider.js');
const generateGameId = () => {
    return uuidv4(); // make this shorter
}

const getById = id => {
    return activeGames[id] ?? null;
}

const invertPosition = (position) => {
    const row = parseInt(position[0])
    const col = parseInt(position[2])
    return `${7-row},${col}`
}

const nextId = (cards) => {
    console.log('finding next id in', cards)
    return 1 + Math.max(...cards.map(i => i.id), 0)
}

const findCardWithId = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) {
            return i
        }
    }
    return -1
}
exports.create = createGameRoom;
exports.getById = getById;
exports.Game = Game