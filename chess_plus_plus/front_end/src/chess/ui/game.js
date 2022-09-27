import React from 'react'
import {Board} from '../model/board.js'
import {Square} from './square.js'
import '../ui/game.css'

export class Game extends React.Component {

    state = {
        gameState: new Board(this.props.isWhite),
        whiteKingCheck: false,
        blackKingCheck: false
    }

    render() {
        let board = [];
        let boardState = this.state.gameState;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                board.push(<Square piece={boardState.getPiece(i, j)} pos={[i, j]}></Square>);
            }
        }
        return (
            // Put all the pieces in here...
            <div class='chessboard'>
                {board}
            </div>
        )
    }
}