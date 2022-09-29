import React from 'react'
import Piece from '../ui/piece.js'
import {useDrop} from 'react-dnd'
//import {BoardState} from '../model/boardState.js'
import '../ui/game.css'

export default function Square({piece, pos, state, updateGame}) {

  // When piece is dropped, check if it can be moved there, then move it
  // and send to backend
  const [{isOver, canDrop}, drop] = useDrop({
    accept: 'Piece',
    drop: (item) => {
      const src_pos = item.id.split("_")[0];
      const dest_pos= pos;
      console.log(src_pos + " to " + dest_pos);
      const validMove = state.boardState.movePiece(src_pos, dest_pos);
      if (validMove) {
        updateGame(state.boardState);
      }
      // SEND THE UPDATE TO THE BACKEND HERE
    },
    canDrop: (item) => {
      const src_pos = item.id.split("_")[0];
      const dest_pos= pos;
      return state.boardState.canMovePiece(src_pos, dest_pos)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })
  let color = ""
    if (isOver && !canDrop) {
        color = 'rgba(255, 0, 0, .6)';
    }
    else if (isOver && canDrop) {
        color = 'rgba(0, 255, 0, .6)';
    }
    else {
        color = 'rgba(255, 255, 0, .6)';
    }

  if (piece !== null) {
      return (
        <div class='square' style={{
          height: '80px',
          width: '80px',
          zIndex: 1,
          backgroundColor: `${canDrop || isOver ? color : ""}`
        }}
         ref={drop}>
          <Piece piece={piece} pos = {pos} state= {state}></Piece>
        </div>
      )
  }
  else {
    return (
      <div class='square' 
        style={{
          height: '80px',
          width: '80px',
          zIndex: 1,
          backgroundColor: `${canDrop || isOver ? color : ""}`
        }}
        ref={drop}>
      </div>
    )
  }
}
