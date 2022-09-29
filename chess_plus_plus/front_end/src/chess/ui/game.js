import React from 'react'
import {Board} from '../model/board.js'
import Square from './square.js'
import '../ui/game.css'

export class Game extends React.Component {

    constructor(props) {
        super();
        this.state = {
            boardState: new Board(props.isWhite),
            whiteKingCheck: false,
            blackKingCheck: false
        }
        this.update = this.update.bind(this);
    }

    update(board) {
        this.setState({boardState: board});
    }

    render() {
        let boardSquares = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                boardSquares.push(<Square piece={this.state.boardState.board[i][j]} 
                    pos={String(i) + ',' + String(j)} 
                    state={this.state}
                    updateGame={this.update}></Square>);
            }
        }
        return (
            // Put all the pieces in here...
            <div class='chessboard'>
                {boardSquares}
            </div>
        )
    }
}