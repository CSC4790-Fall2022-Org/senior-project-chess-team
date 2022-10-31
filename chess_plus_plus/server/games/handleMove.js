const game = require('../games/games')
function handleMove(arg) {
    // TODO: add check for player color and if their turn
    arg = JSON.parse(arg)
    console.log(arg)

    move = arg.move
    board = arg.board
    game_id = arg.game_id
    console.log(move)
    console.log(board.board[0][0])

    let playerGame = game.getById(game_id)

    if(arg.playerIsWhite){
        playerGame.WhiteBoardState.canMovePiece(src, dest)
    }else{
        playerGame.BlackBoardState.canMovePiece(src. dest)
    }

    playerGame.makeMove(board.playerIsWhite, move)

    // set the state if true -> false
    // set the state if false -> true ??
    if(arg.playerIsWhite){
        playerGame = playerGame.BlackBoardState
    }else{
        playerGame = playerGame.WhiteBoardState
    }


    return playerGame
}


exports.handleMove = handleMove