import {Pawn} from '../model/pieces/subpieces.js'
import {Rook} from '../model/pieces/subpieces.js'
import {Bishop} from '../model/pieces/subpieces.js'
import {Queen} from '../model/pieces/subpieces.js'
import {King} from '../model/pieces/subpieces.js'
import {Knight} from '../model/pieces/subpieces.js'

function makeInitialBoard(playerIsWhite) {
    var initBoard = [];

    // Make board of squares
    for (let i = 0; i < 8; i++) {
        initBoard[i] = [];
        for (let j = 0; j < 8; j++) {
            initBoard[i][j] = null;
        }
    }
    // Constant for now, can change if we add the ability to add/draft pieces
    // This is out of scope temporarily

    // Make pawns
    for (let j = 0; j < 8; j++) {
        var pawnOpp = new Pawn(!playerIsWhite);
        var pawnClose = new Pawn(playerIsWhite);
        initBoard[6][j] = pawnClose;
        initBoard[1][j] = pawnOpp;
    }

    // Make other pieces
    for (let j = 0; j < 8; j++) {
        // TODO
    }

    // Update possible moves for all pieces
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var piece = initBoard[i][j]
            if (initBoard[i][j] != null) {
                piece.updatePossibleMoves();
            }
        }
    }
    return initBoard;
}

export class Board {
    constructor(playerIsWhite) {
        this.playerIsWhite = playerIsWhite
        this.board = makeInitialBoard(playerIsWhite)
    }

    getPiece(i, j) {
        return this.board[i][j];
    }

    setPiece(piece, i, j) {
        this.board[i][j] = piece;
    }

    movePiece(startSquare, destSquare) {

    }

}