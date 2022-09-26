import Piece from '../piece'

// Moves will be represented as a tuple containing row, col

class Pawn extends Piece {
    constructor() {
        super();
        if (this.isWhite) {
            this.imageUrl = 'https://commons.wikimedia.org/wiki/File:Chess_plt60.png';
        }
        else {
            this.imageUrl = 'https://commons.wikimedia.org/wiki/File:Chess_pdt60.png';
        }
    }

    // Call this function after a piece is moved
    updatePossibleMoves(i, j, board) {
        // up
        moves = Set();
        if (i > 0) {
            if (board[i - 1][j] == null) {
                moves.add([i - 1, j]);
            }
        }
        // check for starting pawn
        if (i == 6) {
            if (board[i - 2][j] == null) {
                moves.add([i + 1, j]);
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