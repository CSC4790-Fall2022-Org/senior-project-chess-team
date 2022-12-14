const { Piece } = require("../piece.js");

// Moves will be represented as a string tuple containing row,col

export function pairToMoveStr(x, y) {
    let move_str = String(x) + "," + String(y);
    return move_str;
}

export class Pawn extends Piece {
    constructor(isWhite, hasMoved, isFrozen) {
        super(isWhite, hasMoved, isFrozen);
        this.type = "Pawn";
        if (this.isWhite === true) {
            this.imageUrl = 
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Pawn.png";
        } else {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Pawn.png";
        }
    }

    // Call this function after a piece is moved
    updatePossibleMoves(i, j, board, playerIsWhite) {
        if (this.isFrozen) {
            return new Set();
        }
        // up
        var moves = new Set();
        if (i > 0) {
            if (board[i - 1][j] === null) {
                moves.add(pairToMoveStr(i - 1, j));
            }
        }
        // check for starting pawn
        if (!this.hasMoved) {
            // my pawn
            if (this.isWhite === playerIsWhite) {
                if (board[i - 1][j] === null && board[i - 2][j] === null) {
                    moves.add(pairToMoveStr(i - 2, j));
                }
            }
            // enemy pawn
            else {
                if (board[i + 1][j] === null && board[i + 2][j] === null) {
                    moves.add(pairToMoveStr(i + 2, j));
                }
            }
        }
        // INCLUDE EN PASSANT LATER? how tf we do that

        // check for capture my piece
        if (playerIsWhite === this.isWhite) {
            // top left
            if (i > 0 && j > 0) {
                if (
                    board[i - 1][j - 1] !== null &&
                    this.isWhite !== board[i - 1][j - 1].isWhite
                ) {
                    moves.add(pairToMoveStr(i - 1, j - 1));
                }
            }
            // top right
            if (i > 0 && j < board[0].length - 1) {
                if (
                    board[i - 1][j + 1] !== null &&
                    this.isWhite !== board[i - 1][j + 1].isWhite
                ) {
                    moves.add(pairToMoveStr(i - 1, j + 1));
                }
            }
        }
        // check for capture opponent piece
        else {
            // bottom left
            if (i < board.length && j > 0) {
                if (
                    board[i + 1][j - 1] !== null &&
                    this.isWhite !== board[i + 1][j - 1].isWhite
                ) {
                    moves.add(pairToMoveStr(i + 1, j - 1));
                }
            }
            // bottom right
            if (i < board.length && j < board[0].length - 1) {
                if (
                    board[i + 1][j + 1] !== null &&
                    this.isWhite !== board[i + 1][j + 1].isWhite
                ) {
                    moves.add(pairToMoveStr(i + 1, j + 1));
                }
            }
        }
        this.possibleMoves = moves;
    }
}

export class Rook extends Piece {
    
    constructor(isWhite, hasMoved, isFrozen) {
        super(isWhite, hasMoved, isFrozen);
        this.type = 'Rook';
        if (this.isWhite) {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Rook.png";
        } else {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Rook.png";
        }
    }
    updatePossibleMoves(i, j, board, playerIsWhite) {
        if (this.isFrozen) {
            return new Set();
        }
        // up
        var moves = new Set();
        // moving logic?
        // up
        // var flag = true;
        // if(i===7){
        //     flag = false;
        // }

        // up
        for (let k = i - 1; k >= 0; k--) {
            if (board[k][j] === null) {
                moves.add(pairToMoveStr(k, j));
            } else if (board[k][j].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(k, j));
                break;
            } else {
                break;
            }
        }
        // down
        for (let k = i + 1; k <= 7; k++) {
            if (board[k][j] === null) {
                moves.add(pairToMoveStr(k, j));
            } else if (board[k][j].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(k, j));
                break;
            } else {
                break;
            }
        }
        // left
        for (let k = j - 1; k >= 0; k--) {
            if (board[i][k] === null) {
                moves.add(pairToMoveStr(i, k));
            } else if (board[i][k].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(i, k));
                break;
            } else {
                break;
            }
        }
        // right
        for (let k = j + 1; k <= 7; k++) {
            if (board[i][k] === null) {
                moves.add(pairToMoveStr(i, k));
            } else if (board[i][k].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(i, k));
                break;
            } else {
                break;
            }
        }
        this.possibleMoves = moves;
    }
}

export class Knight extends Piece {
    constructor(isWhite, hasMoved, isFrozen) {
        super(isWhite, hasMoved, isFrozen);
        this.type = 'Knight';
        if (this.isWhite === true) {
            this.imageUrl =
                "https://upload.wikimedia.org/wikipedia/commons/0/09/Chess_Glt45.svg";
        } else {
            this.imageUrl =
                "https://upload.wikimedia.org/wikipedia/commons/9/97/Chess_Gdt45.svg";
        }
    }

    updatePossibleMoves(i, j, board, playerIsWhite) {
        if (this.isFrozen) {
            return new Set();
        }
        var moves = new Set();

        let X = [2, 1, -1, -2, -2, -1, 1, 2];
        let Y = [1, 2, 2, 1, -1, -2, -2, -1];

        for (let k = 0; k < 8; k++) {
            let x = i + X[k];
            let y = j + Y[k];

            if (x >= 0 && x < board.length && y >= 0 && y < board.length) {
                if (
                    board[x][y] === null ||
                    this.isWhite !== board[x][y].isWhite
                ) {
                    moves.add(pairToMoveStr(x, y));
                }
            }
        }
        this.possibleMoves = moves;
    }
}

export class Bishop extends Piece {
    constructor(isWhite, hasMoved, isFrozen) {
        super(isWhite, hasMoved, isFrozen);
        this.type = 'Bishop';
        if (this.isWhite === true) {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Bishop%20new.png";
        } else {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Bishop%20new.png";
        }
    }

    updatePossibleMoves(i, j, board, playerIsWhite) {
        if (this.isFrozen) {
            return new Set();
        }
        let moves = new Set();

        // top right
        for (
            let r = i - 1, c = j + 1;
            r >= 0 && c < board[0].length;
            r--, c++
        ) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            } else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            } else {
                break;
            }
        }

        // top left
        for (let r = i - 1, c = j - 1; r >= 0 && c >= 0; r--, c--) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            } else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            } else {
                break;
            }
        }

        // btm left TODO
        for (let r = i + 1, c = j - 1; r < board.length && c >= 0; r++, c--) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            } else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            } else {
                break;
            }
        }

        // btm right TODO
        for (
            let r = i + 1, c = j + 1;
            r < board.length && c < board[0].length;
            r++, c++
        ) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            } else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            } else {
                break;
            }
        }
        this.possibleMoves = moves;
    }
}

export class Queen extends Piece {
    constructor(isWhite, hasMoved, isFrozen) {
        super(isWhite, hasMoved, isFrozen);
        this.type = 'Queen';
        if (this.isWhite) {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20Queen.png";
        } else {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20Queen.png";
        }
    }
    updatePossibleMoves(i, j, board, playerIsWhite) {
        if (this.isFrozen) {
            return new Set();
        }
        // up
        var moves = new Set();

        // BISHOP CODE
        // top right
        for (
            let r = i - 1, c = j + 1;
            r >= 0 && c < board[0].length;
            r--, c++
        ) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            } else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            } else {
                break;
            }
        }

        // top left
        for (let r = i - 1, c = j - 1; r >= 0 && c >= 0; r--, c--) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            } else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            } else {
                break;
            }
        }

        // btm left TODO
        for (let r = i + 1, c = j - 1; r < board.length && c >= 0; r++, c--) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            } else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            } else {
                break;
            }
        }

        // btm right TODO
        for (
            let r = i + 1, c = j + 1;
            r < board.length && c < board[0].length;
            r++, c++
        ) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            } else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            } else {
                break;
            }
        }

        // up
        for (let k = i - 1; k >= 0; k--) {
            if (board[k][j] === null) {
                moves.add(pairToMoveStr(k, j));
            } else if (board[k][j].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(k, j));
                break;
            } else {
                break;
            }
        }
        // down
        for (let k = i + 1; k <= 7; k++) {
            if (board[k][j] === null) {
                moves.add(pairToMoveStr(k, j));
            } else if (board[k][j].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(k, j));
                break;
            } else {
                break;
            }
        }
        // left
        for (let k = j - 1; k >= 0; k--) {
            if (board[i][k] === null) {
                moves.add(pairToMoveStr(i, k));
            } else if (board[i][k].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(i, k));
                break;
            } else {
                break;
            }
        }
        // right
        for (let k = j + 1; k <= 7; k++) {
            if (board[i][k] === null) {
                moves.add(pairToMoveStr(i, k));
            } else if (board[i][k].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(i, k));
                break;
            } else {
                break;
            }
        }
        this.possibleMoves = moves;
    }
}

export class King extends Piece {
    constructor(isWhite, hasMoved, isFrozen) {
        super(isWhite, hasMoved, isFrozen);
        this.type = 'King';
        if (this.isWhite === true) {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/White%20King.png";
        } else {
            this.imageUrl =
                "https://github.com/zanglmh/chessPiecesHolder/raw/main/Black%20King.png";
        }
    }

    updatePossibleMoves(i, j, board, playerIsWhite) {
        if (this.isFrozen) {
            return new Set();
        }
        var moves = new Set();

        let X = [1, 1, 1, 0, 0, -1, -1, -1];
        let Y = [-1, 0, 1, -1, 1, -1, 0, 1];
        for (let k = 0; k < 8; k++) {
            let x = i + X[k];
            let y = j + Y[k];

            if (x >= 0 && x < board.length && y >= 0 && y < board.length) {
                if (
                    board[x][y] === null ||
                    this.isWhite !== board[x][y].isWhite
                ) {
                    moves.add(pairToMoveStr(x, y));
                }
            }
        }

        // Check for the castling
        if (!this.hasMoved) {
            // Check for right side castling
            if (board[7][7] !== null) {
                if (board[7][7].type === 'Rook') {
                    if (!board[7][7].hasMoved) {
                        let canCastle = true;
                        for (let j = 5; j < 7; j++) {
                            if (board[7][j] !== null) {
                                canCastle = false;
                            }
                        }
                        if (canCastle) {
                            moves.add(pairToMoveStr(7, 6))
                        }
                    }
                }
            }
            // Check for left side castling
            if (board[7][0] !== null) {
                if (board[7][0].type === 'Rook') {
                    if (!board[7][0].hasMoved) {
                        let canCastle = true;
                        for (let j = 1; j < 4; j++) {
                            if (board[7][j] !== null) {
                                canCastle = false;
                            }
                        }
                        if (canCastle) {
                            moves.add(pairToMoveStr(7, 2))
                        }
                    }
                }
            }
        }

        this.possibleMoves = moves;
    }
}
