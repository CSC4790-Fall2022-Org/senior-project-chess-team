function isValidMove(move) {
    /*
    GIANT COMMENT:
    handleMove.js is invoked whenever a player makes a move on frontend.
    
    You will probably need to change this functions declaration -
    i think it would prob be best to be stored in GameBoard in games.js
    because I now need to store both the white and black board due to how 
    game is represented on front end.

    SO ideally, in handleMove.js, we will basically check if the player of that color
    can make that move on their board. If so, we make the move on the backend on both
    boards, then send each board to the correct player.
    */
    return true;
}

function movePiece(move, board) {
    
}


exports.isValidMove = isValidMove