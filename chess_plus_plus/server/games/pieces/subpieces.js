const {Piece} = require('./piece.js');

// Moves will be represented as a string tuple containing row,col

function pairToMoveStr(x, y) {
    let move_str = String(x) + ',' + String(y);
    return move_str;
}

class Pawn extends Piece {
    constructor(isWhite, hasMoved) {
        super(isWhite, hasMoved);
        this.type = 'Pawn';
        if (this.isWhite === true) {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Chess_plt60.png';
        }
        else {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Chess_pdt60.png';
        }
    }

    // Call this function after a piece is moved
    updatePossibleMoves(i, j, board, playerIsWhite) {
        // up
        var moves = new Set();
        if (i > 0) {
            if (board[i - 1][j] === null) {
                moves.add(pairToMoveStr(i - 1, j));
            }
        }
        // check for starting pawn
        if (i === 6) {
            if (board[i - 2][j] === null) {
                moves.add(pairToMoveStr(i - 2, j));
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
            if (i < board.length - 1 && j > 0) {
                if (
                    board[i + 1][j - 1] !== null &&
                    this.isWhite !== board[i + 1][j - 1].isWhite
                ) {
                    moves.add(pairToMoveStr(i + 1, j - 1));
                }
            }
            // bottom right
            if (i < board.length - 1 && j < board[0].length - 1) {
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

class Rook extends Piece {
    
    constructor(isWhite, hasMoved) {
        super(isWhite, hasMoved);
        this.type = 'Rook';
        if (this.isWhite) {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Chess_rlt60.png'
        }
        else {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Chess_rdt60.png';
        }
    }
    updatePossibleMoves(i, j, board, playerIsWhite) {
        // up
        var moves = new Set();
        // moving logic?
        // up
        // var flag = true;
        // if(i===7){
        //     flag = false;
        // }

        // up
        for(let k = i-1; k >= 0; k--){
            if (board[k][j] === null){
                moves.add(pairToMoveStr(k,j));
            }
            else if(board[k][j].isWhite !== this.isWhite){
                moves.add(pairToMoveStr(k,j));
                break;
            }else{
                break;
            }
        }
        // down
        for(let k = i+1; k <= 7; k++){
            if (board[k][j] === null){
                moves.add(pairToMoveStr(k,j));
            }
            else if(board[k][j].isWhite !== this.isWhite){
                moves.add(pairToMoveStr(k,j));
                break;
            }else{
                break;
            }
        }
        // left
        for(let k = j-1; k >= 0; k--){
            if (board[i][k] === null){
                moves.add(pairToMoveStr(i,k));
            }
            else if(board[i][k].isWhite !== this.isWhite){
                moves.add(pairToMoveStr(i,k));
                break;
            }else{
                break;
            }
        }
        // right
        for(let k = j+1; k <= 7; k++){
            if (board[i][k] === null){
                moves.add(pairToMoveStr(i,k));
            }
            else if(board[i][k].isWhite !== this.isWhite){
                moves.add(pairToMoveStr(i,k));
                break;
            }else{
                break;
            }
        }   
        this.possibleMoves = moves;
    }
}

class Knight extends Piece {
    constructor(isWhite, hasMoved) {
        super(isWhite, hasMoved);
        this.type = 'Knight';
        if (this.isWhite === true) {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Chess_nlt45.svg/45px-Chess_nlt45.svg.png';
        }
        else {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Chess_ndt45.svg/45px-Chess_ndt45.svg.png';
        }
    }

    updatePossibleMoves(i, j, board, playerIsWhite) {
        var moves = new Set();

        let X = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
        let Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ];

        for (let k = 0; k < 8; k++) {
            let x = i + X[k];
            let y = j + Y[k];

            if (x >= 0 && x < board.length && y >= 0 && y < board.length) {
                if (board[x][y] === null || (this.isWhite !== board[x][y].isWhite)) {
                    moves.add(pairToMoveStr(x, y));   
                }
            }    
        }
        this.possibleMoves = moves;

    }
    

    
}

class Bishop extends Piece {
    constructor(isWhite, hasMoved) {
        super(isWhite, hasMoved);
        this.type = 'Bishop';
        if (this.isWhite === true) {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Chess_blt60.png';
        }
        else {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/8/81/Chess_bdt60.png';
        }
    }

    updatePossibleMoves(i, j, board, playerIsWhite) {
        let moves = new Set();

        // top right
        for (let r = i - 1, c = j + 1; r >= 0 && c < board[0].length; r--, c++) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            }
            else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            }
            else {
                break;
            }
        }

        // top left
        for (let r = i - 1, c = j - 1; r >= 0 && c >= 0; r--, c--) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            }
            else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            }
            else {
                break;
            }
        }

        // btm left TODO
        for (let r = i + 1, c = j - 1; r < board.length && c >= 0; r++, c--) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            }
            else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            }
            else {
                break;
            }
        }

        // btm right TODO
        for (let r = i + 1, c = j + 1; r < board.length && c < board[0].length; r++, c++) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            }
            else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            }
            else {
                break;
            }
        }
        this.possibleMoves = moves;
    }
}

class Queen extends Piece {
    constructor(isWhite, hasMoved) {
        super(isWhite, hasMoved);
        this.type = 'Queen';
        if (this.isWhite) {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/4/49/Chess_qlt60.png'
        }
        else {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png';
        }
    }
    updatePossibleMoves(i, j, board, playerIsWhite) {
        // up
        var moves = new Set();

        // BISHOP CODE
        // top right
        for (let r = i - 1, c = j + 1; r >= 0 && c < board[0].length; r--, c++) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            }
            else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            }
            else {
                break;
            }
        }

        // top left
        for (let r = i - 1, c = j - 1; r >= 0 && c >= 0; r--, c--) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            }
            else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            }
            else {
                break;
            }
        }

        // btm left TODO
        for (let r = i + 1, c = j - 1; r < board.length && c >= 0; r++, c--) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            }
            else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            }
            else {
                break;
            }
        }

        // btm right TODO
        for (let r = i + 1, c = j + 1; r < board.length && c < board[0].length; r++, c++) {
            if (board[r][c] === null) {
                moves.add(pairToMoveStr(r, c));
            }
            else if (board[r][c].isWhite !== this.isWhite) {
                moves.add(pairToMoveStr(r, c));
                break;
            }
            else {
                break;
            }
        }
        
        // ROOK CODE
        // up
        for(let k = i-1; k >= 0; k--){
            if (board[k][j] === null){
                moves.add(pairToMoveStr(k,j));
            }
            else if(board[k][j].isWhite !== this.isWhite){
                moves.add(pairToMoveStr(k,j));
                break;
            }else{
                break;
            }
        }
        // down
        for(let k = i+1; k <= 7; k++){
            if (board[k][j] === null){
                moves.add(pairToMoveStr(k,j));
            }
            else if(board[k][j].isWhite !== this.isWhite){
                moves.add(pairToMoveStr(k,j));
                break;
            }else{
                break;
            }
        }
        // left
        for(let k = j-1; k >= 0; k--){
            if (board[i][k] === null){
                moves.add(pairToMoveStr(i,k));
            }
            else if(board[i][k].isWhite !== this.isWhite){
                moves.add(pairToMoveStr(i,k));
                break;
            }else{
                break;
            }
        }
        // right
        for(let k = j+1; k <= 7; k++){
            if (board[i][k] === null){
                moves.add(pairToMoveStr(i,k));
            }
            else if(board[i][k].isWhite !== this.isWhite){
                moves.add(pairToMoveStr(i,k));
                break;
            }else{
                break;
            }
        }   
        this.possibleMoves = moves;
    }
}

class King extends Piece {
    constructor(isWhite, hasMoved) {
        super(isWhite, hasMoved);
        this.type = 'King';
        if (this.isWhite === true) {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Chess_klt45.svg/68px-Chess_klt45.svg.png';
        }
        else {
            this.imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chess_kdt45.svg/68px-Chess_kdt45.svg.png';
        }
    }
    
    updatePossibleMoves(i, j, board, playerIsWhite) {
        var moves = new Set();

        let X = [ 1, 1, 1, 0, 0, -1, -1, -1 ];
        let Y = [ -1, 0, 1, -1, 1, -1, 0, 1 ];
        for (let k = 0; k < 8; k++) {
            let x = i + X[k];
            let y = j + Y[k];

            if (x >= 0 && x < board.length && y >= 0 && y < board.length) {
                if (board[x][y] === null || (this.isWhite !== board[x][y].isWhite)) {
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

exports.pairToMoveStr = pairToMoveStr;
exports.Pawn = Pawn;
exports.Rook = Rook;
exports.Bishop = Bishop;
exports.Knight = Knight;
exports.Queen = Queen;
exports.King = King;