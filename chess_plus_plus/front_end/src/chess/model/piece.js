export class Piece {
    constructor(isWhite, hasMoved=false) {
        this.possibleMoves = new Set()
        this.isWhite = isWhite
        this.imageUrl = null
        this.type = 'none'
        this.hasMoved = hasMoved;
    }

    updatePossibleMoves() {
        // Template for subclass
    }


}