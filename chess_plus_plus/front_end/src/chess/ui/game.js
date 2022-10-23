import React from 'react'
import {BoardState} from '../model/boardState.js'
import Square from './square.js'
import '../ui/game.css'

export class Game extends React.Component {

    constructor(props) {
        super();
        
        this.state = {
            boardState: new BoardState(props.isWhite)
        }
        this.update = this.update.bind(this);
        this.sendMove = this.sendMove.bind(this);
    }

    update(board) {
        this.setState({boardState: board});
    }

    sendMove(src_pos, dest_pos) {
        console.log('supposed to send move', this.props.ws)
        this.props.ws.emit("playerMove", {
            src: src_pos,
            dest: dest_pos,
          });
    }

    
    render() {
        let boardSquares = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                boardSquares.push(<Square piece={this.state.boardState.board[i][j]} 
                    pos={String(i) + ',' + String(j)} 
                    state={this.state}
                    updateGame={this.update}
                    sendMove={this.sendMove}></Square>
                    );
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