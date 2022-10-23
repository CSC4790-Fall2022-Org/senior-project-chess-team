import React from 'react'
import {BoardState} from '../model/boardState.js'
import Square from './square.js'
import '../ui/game.css'

export class Game extends React.Component {

    constructor(props) {
        console.log("constructor for game")
        super();
        
        this.state = {
            boardState: new BoardState(props.isWhite)
        }
        this.update = this.update.bind(this);
        this.sendMove = this.sendMove.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.receievedMove = this.receievedMove.bind(this);
    }

    update(board) {
        this.setState({boardState: board});
    }

    sendMove(src_pos, dest_pos) {
        // this.props.ws.emit("playerMove", {
        //     src: src_pos,
        //     dest: dest_pos,
        //   });
        this.props.ws.emit('playerMove', JSON.stringify({
            game_id: this.props.id, 
            move: {
                    src: src_pos,
                    dest: dest_pos,
                  },
            board: this.state.boardState
        }))
    }

    makeMove(move) {
        console.log("moveing")
        console.log(this.state.boardState)
        this.state.boardState.movePiece(move.src, move.dest);
        console.log("move?")

        console.log('supposed to send move', this.props.ws)
            console.log(this.state.boardState.board)
            this.update(this.state.boardState);
    }

    receievedMove(board) {
        this.update(board);
    }
    componentDidMount() {
        console.log('game mount')
        this.props.ws.on('updateAfterMove', this.receievedMove)
    }

    componentDidUpdate() {
        console.log('game updated')
    }
    componentWillUnmount() {
        console.log('game will unmount')
        this.props.ws.removeListener("updateAfterMove")
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