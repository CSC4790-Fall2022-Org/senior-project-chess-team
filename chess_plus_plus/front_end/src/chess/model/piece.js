class Piece {
    constructor(isWhite) {
        this.possibleMoves = Set()
        this.isWhite = isWhite
        this.imageUrl = null
    }

    getImageUrl() {
        return this.imageUrl;
    }

    getIsWhite() {
        return this.isWhite;
    }

    updatePossibleMoves() {
        // Template for subclass
    }

    getPossibleMoves() {
        // Don't make a generic piece
        return this.possibleMoves;
    }

}