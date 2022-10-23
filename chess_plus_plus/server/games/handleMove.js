const game = require('../games/games')
const { isValidMove } = require('./movement.js')
function handleMove(arg) {
    // TODO: add check for player color and if their turn
    arg = JSON.parse(arg)
    move = arg.move
    board = arg.board
    game_id = arg.game_id
    console.log(move)
    console.log(board.board[0][0])

    if (!board.playerIsWhite) {
        console.log(move)
        move = invertBlackMove(move)
        console.log(move)
    }
    let playerGame = game.getById(game_id)
    console.log(playerGame)
    // if (!isValidMove(null)) {
    //   return null
    // }


}

const invertBlackMove = move => {
    const invertCoords = coords => {
        split_coords = coords.split(',')
        col = parseInt(split_coords[1])
        row = parseInt(split_coords[0])
        col = 7 - col;
        row = 7 - row; // indices are 0 -> 7, so to invert over axis, do 7 - index
        return `${row},${col}`
    }
    move.src = invertCoords(move.src)
    move.dest = invertCoords(move.dest)
    return move
}

exports.handleMove = handleMove