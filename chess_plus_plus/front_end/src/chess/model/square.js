class Square {
    constructor(x, y, piece) {
        this.x = x
        this.y = y
        this.piece = piece
    }

    setPiece(piece) {
        this.piece = piece;
    }

    getPiece(piece) {
        return this.piece;
    }
}