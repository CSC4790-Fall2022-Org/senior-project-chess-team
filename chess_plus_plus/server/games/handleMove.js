const game = require('../games/games')
function handleMove(arg) {
    // TODO: add check for player color and if their turn
    arg = JSON.parse(arg)
    // console.log(arg)
    move = arg.move
    board = arg.board
    game_id = arg.game_id
    // console.log(move)
    console.log(board.board[0][0])

    let playerGame = game.getById(game_id)

    playerGame.makeMove(board.playerIsWhite, move)

    return playerGame
}


exports.handleMove = handleMove