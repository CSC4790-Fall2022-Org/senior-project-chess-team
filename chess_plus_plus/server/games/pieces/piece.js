class Piece {
    constructor(isWhite) {
        this.possibleMoves = new Set()
        this.isWhite = isWhite
        this.imageUrl = null
        this.type = 'none'
        this.hasMoved = false;
    }

    updatePossibleMoves() {
        // Template for subclass
    }


}

exports.Piece = Piece;