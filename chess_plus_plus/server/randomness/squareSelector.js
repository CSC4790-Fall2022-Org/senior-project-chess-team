// should probably pass a boardstate, then make a multiset of all possible moves. Then, select a random one.
function getRandomSquare(boardState) {
    boardState.updateAllMoves()
    const allPlayerMoves = getAllMoves(boardState)
    const randomNum = getRandomNumber(0, allPlayerMoves.length)
    return allPlayerMoves[randomNum]
}

const getRandomNumber = (min, max) => {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}

const getAllMoves = boardState => {
    const board = boardState.board
    console.log(board)
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