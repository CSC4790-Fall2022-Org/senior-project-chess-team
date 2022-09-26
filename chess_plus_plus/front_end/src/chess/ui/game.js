import React from 'react'
// import Board from '../model/board'
import '../ui/game.css'

class Game extends React.Component {
    state = {
        gameState: new Board(props.isWhite),
        whiteKingCheck: false,
        blackKingCheck: false
    }

    render() {
        return (
            // Put all the pieces in here...
            <div class="background">
                <p> Chess game </p>
            </div>
        )
    }
}

export default Game
