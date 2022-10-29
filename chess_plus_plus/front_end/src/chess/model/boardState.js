import {Pawn} from './pieces/subpieces.js'
import {Rook} from './pieces/subpieces.js'
import {Bishop} from './pieces/subpieces.js'
import {Queen} from './pieces/subpieces.js'
import {King} from './pieces/subpieces.js'
import {Knight} from './pieces/subpieces.js'
import {pairToMoveStr} from './pieces/subpieces.js'

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

    // Make Rooks
    var rookOpp1 = new Rook(!playerIsWhite);
    var rookOpp2 = new Rook(!playerIsWhite);
    var rookClose1 = new Rook(playerIsWhite);
    var rookClose2 = new Rook(playerIsWhite);
    initBoard[7][0] = rookClose1;
    initBoard[7][7] = rookClose2;
    initBoard[0][0] = rookOpp1;
    initBoard[0][7] = rookOpp2;

    //Make Kings
    var kingOpp = new King(!playerIsWhite);
    var kingClose = new King(playerIsWhite);
    initBoard[0][4] = kingOpp;
    initBoard[7][4] = kingClose;

    // Make Queens
    var queenOpp = new Queen(!playerIsWhite);
    var queenClose = new Queen(playerIsWhite);
    initBoard[0][3] = queenOpp;
    initBoard[7][3] = queenClose;

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
                    return pairToMoveStr(i, j);
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
                    return pairToMoveStr(i, j);
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

function moveSafeFromCheck(board, src, dest, playerIsWhite) {
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
        this.whiteKingInCheck = false;
        this.blackKingInCheck = false;
        this.board = makeInitialBoard(playerIsWhite);
    }

    // src and dest are strings
    canMovePiece(src, dest) {
        if (this.board[parseInt(dest[0])][parseInt(dest[2])] === null || 
            this.board[parseInt(dest[0])][parseInt(dest[2])].isWhite !== this.board.playerIsWhite) {
            if (this.board[parseInt(src[0])][parseInt(src[2])].possibleMoves.has(dest)) {
                if (moveSafeFromCheck(this.board, src, dest, this.playerIsWhite)) {
                    return true;
                }
                return false;
            }
        }
        return false;
    }


    updateAllMoves() {
        console.log("updating all moves on board")
        this.board = updatePossibleMovesAllPieces(this.board, this.playerIsWhite);
    }
    
    movePiece(src, dest) {
        this.board = movePieceHelper(this.board, src, dest);
        this.board = updatePossibleMovesAllPieces(this.board, this.playerIsWhite);
        console.log(this.board[parseInt(dest[0])][parseInt(dest[2])].possibleMoves);
        this.postMoveCheckUpdate();
        console.log(this.whiteKingInCheck + " " + this.blackKingInCheck);
        return true;
    }

    postMoveCheckUpdate() {
        if (whiteKingInCheck(this.board)) {
            this.whiteKingInCheck = true;
        }
        else {
            this.whiteKingInCheck = false;
        }
        if (blackKingInCheck(this.board)) {
            this.blackKingInCheck = true;
        }
        else {
            this.blackKingInCheck = false;
        }
    }

    // Check for checkmate after recieving boardState update from opponent move
    /* Steps:
        1. Recieve updated board state from backend
        2. Check if player's king is in check from board attribute
        3. If it is in check, make sure playerCanMove(), if not, they lose
    */
    playerCanMove() {
        if (this.playerIsWhite) {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[0].length; j++) {
                    if (this.board[i][j] !== null) {
                        if (this.board[i][j].isWhite && this.board[i][j].possibleMoves.size > 0) {
                            let canMove = false;
                            this.board[i][j].possibleMoves.forEach(dest => {
                                let src = pairToMoveStr(i, j);
                                if (moveSafeFromCheck(this.board, src, dest, this.playerIsWhite)) {
                                    console.log(this.board[i][j]);
                                    console.log(src + " " + dest);
                                    canMove = true;
                                }
                            })
                            if (canMove) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        else {
            for (let i = 0; i < this.board.length; i++) {
                for (let j = 0; j < this.board[0].length; j++) {
                    if (this.board[i][j] !== null) {
                        if (!this.board[i][j].isWhite && this.board[i][j].possibleMoves.size > 0) {
                            let canMove = false;
                            this.board[i][j].possibleMoves.forEach(dest => {
                                let src = pairToMoveStr(i, j);
                                if (moveSafeFromCheck(this.board, src, dest, this.playerIsWhite)) {
                                    console.log(this.board[i][j]);
                                    console.log(src + " " + dest);
                                    canMove = true;
                                }
                            })
                            if (canMove) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        // Handle win here or where the function returns false to
        console.log("checkmate!!");
        return false;
    }

    isPawnPromotion(src, dest) {
        console.log(dest)
        return this.board[parseInt(src[0])][parseInt(src[2])].type === 'Pawn'
        && parseInt(dest[0]) === 0
    }

}