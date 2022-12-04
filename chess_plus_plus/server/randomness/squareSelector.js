// should probably pass a boardstate, then make a multiset of all possible moves. Then, select a random one.
function getRandomSquare(boardState) {
    boardState.updateAllMoves()
    const allPlayerMoves = getAllMoves(boardState)
    const randomNum = getRandomNumber(0, allPlayerMoves.length)
    return allPlayerMoves[randomNum]
}

function getRandomEnemySquare(boardState) {
    let squares = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (boardState.board[i][j] !== null) {
                if (boardState.playerIsWhite !== boardState.board[i][j].isWhite) {
                    if (boardState.board[i][j].type !== 'King') {
                        squares.push([i, j]);
                    }
                }
            }
        }
    }
    let idx = getRandomNumber(0, squares.length - 1);
    return squares[idx];
}

function getRandomEnemySquareNoPawns(boardState) {
    let squares = []
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (boardState.board[i][j] !== null) {
                if (boardState.playerIsWhite !== boardState.board[i][j].isWhite) {
                    if (boardState.board[i][j].type !== 'King' && boardState.board[i][j].type !== 'Pawn') {
                        squares.push([i, j]);
                    }
                }
            }
        }
    }
    let idx = getRandomNumber(0, squares.length - 1);
    return squares[idx];
}

const getRandomNumber = (min, max) => {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

const getAllMoves = boardState => {
    const board = boardState.board
    const moves = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j] !== null) {
                if (board[i][j].isWhite === boardState.playerIsWhite) {
                    board[i][j].possibleMoves.forEach(item => moves.push(item))
                }
            }
        }
    }
    return moves
}
exports.getRandomSquare = getRandomSquare;
exports.getRandomEnemySquare = getRandomEnemySquare;
exports.getRandomEnemySquareNoPawns = getRandomEnemySquareNoPawns;
exports.getRandomNumber = getRandomNumber;