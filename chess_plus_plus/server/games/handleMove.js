const game = require('../games/games')
// Return a tuple with second element indicating check-mate status
function handleMove(arg) {
    // TODO: add check for player color and if their turn
    arg = JSON.parse(arg)

    console.log(arg.move)
    // console.log(arg)
    move = arg.move
    board = arg.board
    game_id = arg.game_id
    // console.log(move)

    let playerGame = game.getById(game_id)
    
    const src = move.src
    const dest = move.dest
    /*
    This code below needs some slight changes. 
    If either of the functions returns false, then we should return null because that means
    a player is making a move they can not make.
    So, the if statement part is fine, but we are going to need another if statement inside 
    of these if statements to check if canMovePiece returns false.
    */
    if(arg.board.playerIsWhite){
        if(playerGame.whiteBoard.canMovePiece(src, dest)){
            playerGame.makeMove(board.playerIsWhite, move)
        }else{
            return null;
        }
    }else{
        if(playerGame.blackBoard.canMovePiece(src, dest)){
            playerGame.makeMove(board.playerIsWhite, move)
        }else{
            return null;
        }
    }
    



    // Check for Checkmate
    if (playerGame.opponentInCheckMate(board.playerIsWhite)) {
        return board.playerIsWhite ? [playerGame, 'W'] : [playerGame, 'B']
    }

    return [playerGame, 'X']
}


exports.handleMove = handleMove