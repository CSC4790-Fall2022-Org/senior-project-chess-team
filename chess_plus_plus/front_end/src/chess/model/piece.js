export class Piece {
    constructor(isWhite, hasMoved=false, isFrozen=false) {
        this.possibleMoves = new Set()
        this.isWhite = isWhite
        this.imageUrl = null
        this.type = 'none'
        this.hasMoved = hasMoved;
        this.isFrozen = isFrozen;
    }

    updatePossibleMoves() {
        // Template for subclass
    }


}