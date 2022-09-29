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

    // Make knights
    var knightOpp1 = new Knight(!playerIsWhite);
    var knightOpp2 = new Knight(!playerIsWhite);
    var knightClose1 = new Knight(playerIsWhite);
    var knightClose2 = new Knight(playerIsWhite);
    initBoard[7][2] = knightClose1;
    initBoard[7][5] = knightClose2;
    initBoard[0][2] = knightOpp1;
    initBoard[0][5] = knightOpp2;

    // Make rooks
    var rookOpp1 = new Rook(!playerIsWhite);
    var rookOpp2 = new Rook(!playerIsWhite);
    initBoard[0][0] = rookOpp1;
    initBoard[0][7] = rookOpp2;
    var rookOopCloes1 = new Rook(playerIsWhite);
    var rookOopCloes2 = new Rook(playerIsWhite);
    initBoard[4][4] = rookOopCloes1;
    initBoard[5][5] = rookOopCloes2;

    // Update possible moves for all pieces
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var piece = initBoard[i][j];
            if (piece != null) {
                piece.updatePossibleMoves(i, j, initBoard);
            }
        }
    }
    return initBoard;
}

function updatePossibleMovesAllPieces(board) {
    // Update possible moves for all pieces
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var piece = board[i][j];
            if (piece !== null) {
                piece.updatePossibleMoves(i, j, board);
            }
        }
    }
    return board;
}

export class Board {
    constructor(playerIsWhite) {
        this.playerIsWhite = playerIsWhite;
        this.board = makeInitialBoard(playerIsWhite);
    }

    // src and dest are strings
    canMovePiece(src, dest) {
        if (this.board[parseInt(dest[0])][parseInt(dest[2])] == null || 
            this.board[parseInt(dest[0])][parseInt(dest[2])].isWhite !== this.board.playerIsWhite) {
            if (this.board[parseInt(src[0])][parseInt(src[2])].possibleMoves.has(dest)) {
                return true;
            }
        }
        return false;
    }

    movePiece(src, dest) {
        if (!this.canMovePiece(src, dest)) {
            console.log("invalid move");
            return false
        }
        let src_piece = this.board[parseInt(src[0])][parseInt(src[2])];
        this.board[parseInt(dest[0])][parseInt(dest[2])] = src_piece;
        this.board[parseInt(src[0])][parseInt(src[2])] = null;
        this.board = updatePossibleMovesAllPieces(this.board);
        console.log(this.board[parseInt(dest[0])][parseInt(dest[2])].possibleMoves);
        return true;
    }

}