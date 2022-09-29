import {Pawn} from './pieces/subpieces.js'
import {Rook} from './pieces/subpieces.js'
import {Bishop} from './pieces/subpieces.js'
import {Queen} from './pieces/subpieces.js'
import {King} from './pieces/subpieces.js'
import {Knight} from './pieces/subpieces.js'

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
    initBoard[7][1] = knightClose1;
    initBoard[7][6] = knightClose2;
    initBoard[0][1] = knightOpp1;
    initBoard[0][6] = knightOpp2;

    // Make Bishops
    var bishopOpp1 = new Bishop(!playerIsWhite);
    var bishopOpp2 = new Bishop(!playerIsWhite);
    var bishopClose1 = new Bishop(playerIsWhite);
    var bishopClose2 = new Bishop(playerIsWhite);
    initBoard[7][2] = bishopClose1;
    initBoard[7][5] = bishopClose2;
    initBoard[0][2] = bishopOpp1;
    initBoard[0][5] = bishopOpp2;

    //Make Kings
    var kingOpp = new King(!playerIsWhite);
    var kingClose = new King(playerIsWhite);
    initBoard[0][4] = kingOpp;
    initBoard[7][4] = kingClose;

    // Update possible moves for all pieces
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var piece = initBoard[i][j];
            if (piece != null) {
                piece.updatePossibleMoves(i, j, initBoard, playerIsWhite);
            }
        }
    }
    return initBoard;
}

function updatePossibleMovesAllPieces(board, playerIsWhite) {
    // Update possible moves for all pieces
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var piece = board[i][j];
            if (piece !== null) {
                piece.updatePossibleMoves(i, j, board, playerIsWhite);
            }
        }
    }
    return board;
}

function movePieceHelper(board, src, dest) {
    let src_piece = board[parseInt(src[0])][parseInt(src[2])];
    board[parseInt(src[0])][parseInt(src[2])] = null;
    board[parseInt(dest[0])][parseInt(dest[2])] = src_piece;
    return board;
}

function undoMoveHelper(board, src, dest, dest_piece) {
    board[parseInt(src[0])][parseInt(src[2])] = board[parseInt(dest[0])][parseInt(dest[2])];
    board[parseInt(dest[0])][parseInt(dest[2])] = dest_piece;
    return board;
}

function getWhiteKingPosStr(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== null) {
                if (board[i][j].type === 'King' && board[i][j].isWhite) {
                    return String(i) + ',' + String(j);
                }
            }
        }
    }
}

function getBlackKingPosStr(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== null) {
                if (board[i][j].type === 'King' && !board[i][j].isWhite) {
                    return String(i) + ',' + String(j)
                }
            }
        }
    }
}

function whiteKingInCheck(board) {
    let kingPos = getWhiteKingPosStr(board);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== null) {
                if (!board[i][j].isWhite && board[i][j].possibleMoves.has(kingPos)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function blackKingInCheck(board) {
    let kingPos = getBlackKingPosStr(board);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== null) {
                if (board[i][j].isWhite && board[i][j].possibleMoves.has(kingPos)) {
                    return true;
                }
            }
        }
    }
    return false;
}

function moveSafeFromCheck(board, playerIsWhite, src, dest) {
    let dest_piece = board[parseInt(dest[0])][parseInt(dest[2])];
    board = movePieceHelper(board, src, dest);
    board = updatePossibleMovesAllPieces(board, playerIsWhite);
    let ret = true;
    if (playerIsWhite) {
        if (whiteKingInCheck(board)) {
            ret = false;
        }
    }
    else {
        if (blackKingInCheck(board)) {
            ret = false;
        }
    }
    board = undoMoveHelper(board, src, dest, dest_piece);
    board = updatePossibleMovesAllPieces(board, playerIsWhite);
    return ret
}

export class BoardState {
    constructor(playerIsWhite) {
        this.playerIsWhite = playerIsWhite;
        this.meInCheck = false;
        this.oppInCheck = false;
        this.board = makeInitialBoard(playerIsWhite);
    }

    // src and dest are strings
    canMovePiece(src, dest) {
        if (this.board[parseInt(dest[0])][parseInt(dest[2])] === null || 
            this.board[parseInt(dest[0])][parseInt(dest[2])].isWhite !== this.board.playerIsWhite) {
            if (this.board[parseInt(src[0])][parseInt(src[2])].possibleMoves.has(dest)) {
                if (moveSafeFromCheck(this.board, this.playerIsWhite, src, dest)) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }

    movePiece(src, dest) {  
        this.board = movePieceHelper(this.board, src, dest);
        this.board = updatePossibleMovesAllPieces(this.board, this.playerIsWhite);
        console.log(this.board[parseInt(dest[0])][parseInt(dest[2])].possibleMoves);
        return true;
    }

}