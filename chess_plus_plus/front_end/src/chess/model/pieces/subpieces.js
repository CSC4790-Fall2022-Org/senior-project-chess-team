import {Piece} from '../piece.js'

// Moves will be represented as a string tuple containing row,col

function pairToMoveStr(x, y) {
    let move_str = String(x) + ',' + String(y);
    return move_str;
}

export class Pawn extends Piece {
    constructor(isWhite) {
        super();
        this.isWhite = isWhite;
        this.type = 'Pawn';
        if (this.isWhite === true) {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png';
        }
        else {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png';
        }
    }

    // Call this function after a piece is moved
    updatePossibleMoves(i, j, board) {
        // up
        var moves = new Set();
        if (i > 0) {
            if (board[i - 1][j] === null) {
                moves.add(pairToMoveStr(i - 1, j));
            }
        }
        // check for starting pawn
        if (i === 6) {
            if (board[i - 2][j] === null) {
                moves.add(pairToMoveStr(i - 2, j));
            }
        }
        // INCLUDE EN PASSANT LATER? how tf we do that

        // check for capture
            // top left
            if (i > 0 && j > 0) {
                if (board[i - 1][j - 1] !== null && (this.isWhite !== board[i - 1][j - 1].isWhite)) {
                    moves.add(pairToMoveStr(i - 1, j - 1));
                }
            }
            // top right
            if (i > 0 && j < board.length - 1) {
                if (board[i - 1][j + 1] !== null && (this.isWhite !== board[i - 1][j + 1].isWhite)) {
                    moves.add(pairToMoveStr(i - 1, j + 1));
                }
            }
        this.possibleMoves = moves;
    }
}

class Rook extends Piece {
    constructor() {
        super();
        if (this.isWhite) {
            this.imageUrl = 'https://commons.wikimedia.org/wiki/Category:PNG_chess_pieces/Standard_transparent#/media/File:Chess_rlt60.png';
            }
        else {
            this.imageUrl = 'https://commons.wikimedia.org/wiki/Category:PNG_chess_pieces/Standard_transparent#/media/File:Chess_rdt60.png';
        }
    }
    updatePossibleMoves(i, j, board) {
        // up
        moves = Set();
        // moving logic?
        if (i > 0) {
            if (board[i - 1][j] == null) {
                moves.add([i - 1, j]);
            }
        }
        // INCLUDE EN PASSANT LATER? how tf we do that
        
        // check for capture
            // top left
            if (i > 0 && j > 0) {
                if (board[i - 1][j - 1].getPiece() != null && (this.isWhtie != board[i - 1][j - 1].getPiece().getIsWhite())) {
                    moves.add([i - 1, j - 1]);
                }
            }
            // top right
            if (i > 0 && j < board.length - 1) {
                if (board[i + 1][j + 1] != null && (this.isWhtie != board[i - 1][j - 1].getPiece().getIsWhite())) {
                    moves.add([i + 1, j + 1]);
                }
            }
        this.possibleMoves = moves;
    }
}

export class Knight extends Piece {
    constructor(isWhite) {
        super();
        this.isWhite = isWhite;
        this.type = 'Knight';
        if (this.isWhite === true) {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png';
        }
        else {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png';
        }
    }

    updatePossibleMoves(i, j, board) {
        var moves = new Set();

        let X = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
        let Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ];

        for (let k = 0; k < 8; k++) {
            let x = i + X[k];
            let y = j + Y[k];

            if (x >= 0 && x < board.length && y >= 0 && y < board.length) {
                if (board[x][y] === null || (this.isWhite !== board[x][y].isWhite)) {
                    moves.add(pairToMoveStr(x, y));   
                }
            }    
        }
        this.possibleMoves = moves;

    }
    

    
}

class Bishop extends Piece {

}

class Queen extends Piece {

}

class King extends Piece {

}