class Piece {
    constructor(isAttacked, isWhite) {
        this.possibleMoves = []
        this.isWhite = isWhite
        this.isAttacked = isAttacked
    }

    getPossibleMoves() {
        // Don't make a generic piece
        return null;
    }

}