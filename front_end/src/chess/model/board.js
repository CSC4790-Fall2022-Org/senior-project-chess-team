import Pawn from '../model/pieces/pawn'

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
            pawnOpp = Pawn(false, !playerIsWhite);
            pawnClose = Pawn(false, playerIsWhite);
            initBoard[6][j].setPiece(pawnOpp);
            initBoard[1][j].setPiece(pawnClose);
        }

        // Make other pieces
        for (let j = 0; j < 8; j++) {
            // TODO
        }
        return initBoard;
    }

    movePiece(startSquare, destSquare) {

    }

}