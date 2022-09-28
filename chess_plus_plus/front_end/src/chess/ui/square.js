import React from 'react'
import Piece from '../ui/piece.js'
import {useDrop} from 'react-dnd'
import {Board} from '../model/board.js'
import '../ui/game.css'

export default function Square({piece, pos, state, updateGame}) {

  // When piece is dropped, check if it can be moved there, then move it
  // and send to backend
  const [, drop] = useDrop({
    accept: 'Piece',
    drop: (item) => {
      const src_pos = item.id.split("_")[0];
      let isWhite = item.id.split("_")[2];
      isWhite = isWhite === "true" ? true : false;
      if (isWhite !== state.boardState.playerIsWhite) {
        return;
      }
      const dest_pos= pos;
      console.log(src_pos + " to " + dest_pos);
      const validMove = state.boardState.movePiece(src_pos, dest_pos);
      if (validMove) {
        updateGame(state.boardState);
      }
      // SEND THE UPDATE TO THE BACKEND HERE
    }
  })
  if (piece !== null) {
      return (
        <div class='square' ref={drop}>
          <Piece piece={piece} pos = {pos} state= {state}></Piece>
        </div>
      )
  }
  else {
    return (
      <div class='square' ref={drop}>
      </div>
    )
  }
}
