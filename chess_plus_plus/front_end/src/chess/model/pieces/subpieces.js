import {Piece} from '../piece.js'

// Moves will be represented as a string tuple containing row,col

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
        var move_str = ""
        if (i > 0) {
            if (board[i - 1][j] === null) {
                move_str = ""
                move_str += String(i - 1) + ',' + String(j)
                moves.add(move_str);
            }
        }
        // check for starting pawn
        if (i === 6) {
            if (board[i - 2][j] === null) {
                move_str = ""
                move_str += String(i - 2) + ',' + String(j)
                moves.add(move_str);
            }
        }
        // INCLUDE EN PASSANT LATER? how tf we do that

        // check for capture
            // top left
            if (i > 0 && j > 0) {
                if (board[i - 1][j - 1] !== null && (this.isWhite !== board[i - 1][j - 1].isWhite)) {
                    move_str = ""
                    move_str += String(i - 1) + ',' + String(j - 1)
                    moves.add(move_str);
                }
            }
            // top right
            if (i > 0 && j < board.length - 1) {
                if (board[i - 1][j + 1] !== null && (this.isWhite !== board[i - 1][j + 1].isWhite)) {
                    move_str = ""
                    move_str += String(i - 1) + ',' + String(j + 1)
                    moves.add(move_str);
                }
            }
        this.possibleMoves = moves;
    }
}

class Rook extends Piece {

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
        var move_str = "";

        let X = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
        let Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ];

        for (let k = 0; k < 8; k++) {
            move_str = "";
                
            let x = i + X[k];
            let y = j + Y[k];

            if (x >= 0 && x < board.length && y >= 0 && y < board.length) {
                if (board[x][y] === null || (this.isWhite !== board[x][y].isWhite)) {
                    move_str += String(x) + ',' + String(y);
                    moves.add(move_str);   
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