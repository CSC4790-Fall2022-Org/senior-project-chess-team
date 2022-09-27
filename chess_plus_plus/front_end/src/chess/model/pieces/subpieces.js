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
            if (board[i - 1][j] == null) {
                move_str = ""
                move_str += String(i - 1) + ',' + String(j)
                moves.add(move_str);
            }
        }
        // check for starting pawn
        if (i === 6) {
            if (board[i - 2][j] == null) {
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

class Knight extends Piece {

}

class Bishop extends Piece {

}

class Queen extends Piece {

}

class King extends Piece {

}