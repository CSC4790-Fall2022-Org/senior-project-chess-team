const { Knight, Rook, Pawn, Bishop, Queen, King } = require('../../games/pieces/subpieces.js');
const {Card} = require('./card.js')
const { getRandomEnemySquare, getRandomNumber } = require('../squareSelector')

function getLowestAvailableSquare(boardState) {
    for (let i = 7; i >= 0; i--) {
        for (let j = 0; j < 8; j++) {
            if (boardState.board[i][j] === null) {
                return [i,j];
            }
        }
    }
}

class FreezeCard extends Card {
    constructor() {
        super('Freeze', 3);
        this.description = 'Freeze a random enemy piece for 1 turn'
    }

    action(boardState, target) {
        // manipulate the boardstate in some way. 
        console.log('Action was called')
        // For now pick a random target square
        target = getRandomEnemySquare(boardState);
        // if (boardState.playerIsWhite) {
        //     boardState.blackDeadPieces.push(boardState.board[target[0]][target[1]].type)
        // }
        // else {
        //     boardState.whiteDeadPieces.push(boardState.board[target[0]][target[1]].type)
        // }
        console.log(boardState.whiteDeadPieces, boardState.blackDeadPieces)
        boardState.board[target[0]][target[1]].isFrozen = true;


    }
}

class FrozenCrossCard extends Card {
    constructor() {
        super('Frozen Cross', 3);
        this.description = 'Freeze a random row and column of pieces (including your own!)'
    }

    action(boardState, target) {
        // manipulate the boardstate in some way. 
        console.log('Action was called')
        let row = getRandomNumber(0, 7)
        let col = getRandomNumber(0, 7)
        // if (boardState.playerIsWhite) {
        //     boardState.blackDeadPieces.push(boardState.board[target[0]][target[1]].type)
        // }
        // else {
        //     boardState.whiteDeadPieces.push(boardState.board[target[0]][target[1]].type)
        // }
        for (let j = 0; j < 8; j++) {
            if (boardState.board[row][j] !== null) {
                boardState.board[row][j].isFrozen = true;
            }
        }
        for (let i = 0; i < 8; i++) {
            if (boardState.board[i][col] !== null) {
                boardState.board[i][col].isFrozen = true;
            }
        }


    }
}

class SwapHandsCard extends Card {
    constructor() {
        super('Swap Hands', 1);
        this.description = 'Swap hands with your opponent'
    }

    action(boardState, target) {
        return 'swap';
    }
}


class ResurrectCard extends Card {
    constructor() {
        super('Resurrect', 1);
        this.description = 'Revive a random piece from your graveyard of captured pieces'
    }

    action(boardState, target) {
        console.log('Action was called')
        console.log(boardState.whiteDeadPieces, boardState.blackDeadPieces)
        target = getLowestAvailableSquare(boardState);
        let deadPieces = boardState.playerIsWhite ? boardState.whiteDeadPieces : boardState.blackDeadPieces;
        console.log(deadPieces);
        let idx = getRandomNumber(0, deadPieces.length - 1);
        let pieceName = deadPieces[idx];
        const removeIdx = deadPieces.indexOf(pieceName);
        if (removeIdx > -1) {
            deadPieces.splice(removeIdx, 1);
        }
        let piece = null;
        switch(pieceName) {
            case 'Pawn':
                piece = new Pawn(boardState.playerIsWhite, false)
                break;
            case 'Rook':
                piece = new Rook(boardState.playerIsWhite, false)
                break
            case 'Knight':
                piece = new Knight(boardState.playerIsWhite, false)
                break
            case 'Bishop':
                piece = new Bishop(boardState.playerIsWhite, false)
                break
            case 'Queen':
                piece = new Queen(boardState.playerIsWhite, false)
                break
            case 'King':
                piece = new King(boardState.playerIsWhite, false)
                break
            default:
                break
        }
        boardState.board[target[0]][target[1]] = piece;
        // manipulate the boardstate in some way. 
    }
}
// instantiate one of each card in the array.
let cards = [
    new FreezeCard(),
    new ResurrectCard(),
    new SwapHandsCard(),
    new FrozenCrossCard()
]
exports.cards = cards