import Pawn from '../model/pieces/subpieces.js'
import Rook from '../model/pieces/subpieces.js'
import Bishop from '../model/pieces/subpieces.js'
import Queen from '../model/pieces/subpieces.js'
import King from '../model/pieces/subpieces.js'
import Knight from '../model/pieces/subpieces.js'

class Board {
    constructor(playerIsWhite) {
        this.playerIsWhite = playerIsWhite
        this.board = makeInitialBoard(playerIsWhite)
    }

    makeInitialBoard(playerIsWhite) {
        initBoard[8][8];

        // Make board of squares
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                initBoard[i][j] = new Square(i, j, null);
            }
        }
        // Constant for now, can change if we add the ability to add/draft pieces
        // This is out of scope temporarily

        // Make pawns
        for (let j = 0; j < 8; j++) {
            pawnOpp = Pawn(!playerIsWhite);
            pawnClose = Pawn(playerIsWhite);
            initBoard[6][j].setPiece(pawnOpp);
            initBoard[1][j].setPiece(pawnClose);
        }

        // Make other pieces
        for (let j = 0; j < 8; j++) {
            // TODO
        }

        // Update possible moves for all pieces
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                piece = initBoard[i][j].getPiece()
                if (initBoard[i][j].getPiece() != null) {
                    piece.updatePossibleMoves();
                }
            }
        }
        return initBoard;
    }

    movePiece(startSquare, destSquare) {

    }

}