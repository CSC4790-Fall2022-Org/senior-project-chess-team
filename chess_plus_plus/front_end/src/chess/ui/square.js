import React from 'react'
import Piece from '../ui/piece.js'
import '../ui/game.css'

export class Square extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    if (this.props.piece !== null) {
      return (
        <div class='square'>
          <Piece piece={this.props.piece} pos = {this.props.pos}></Piece>
        </div>
      )
    }
    else {
      return (
        <div class='square'>
        </div>
      )
    }
  }
}
