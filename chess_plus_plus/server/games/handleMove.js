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
    
    const src = move.src
    const dest = move.dest
    /*
    This code below needs some slight changes. 
    If either of the functions returns false, then we should return null because that means
    a player is making a move they can not make.
    So, the if statement part is fine, but we are going to need another if statement inside 
    of these if statements to check if canMovePiece returns false.
    */
    if(arg.playerIsWhite){
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
    

    // playerGame.makeMove(board.playerIsWhite, move)

    // set the state if true -> false
    // set the state if false -> true ??
    /*
    This statement is not really on the right track, check my solution below.
    Its a lot easier to just write this part instead of explaining it so I'm sorry about that.
    
    if(arg.playerIsWhite){
        playerGame = playerGame.BlackBoardState
    }else{
        playerGame = playerGame.WhiteBoardState
    }

    Basically, my solution looks at each board state and changes the value in
    isWhiteTurn to the opposite value
    True becomes !True, which is False.
    False becomes !False, which is True.
    */

    playerGame.whiteBoard.isWhiteTurn = !playerGame.whiteBoard.isWhiteTurn
    playerGame.blackBoard.isWhiteTurn = !playerGame.blackBoard.isWhiteTurn

    return playerGame
}


exports.handleMove = handleMove