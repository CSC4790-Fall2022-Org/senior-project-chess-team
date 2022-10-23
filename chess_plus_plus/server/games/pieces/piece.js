 class Piece {
    constructor(isWhite) {
        this.possibleMoves = new Set()
        this.isWhite = isWhite
        this.type = 'none'
    }

    updatePossibleMoves() {
        // Template for subclass
    }

    toJSON() {
        return {
            isWhite: this.isWhite,
            type: this.type
        }
    }

}

exports.Piece = Piece;