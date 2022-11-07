import React, {useEffect} from 'react'
import Piece from '../ui/piece.js'
import {useDrop} from 'react-dnd'
//import {BoardState} from '../model/boardState.js'
import '../ui/game.css'
import specialSquareBackground from '../files/getEffectSquare.jpeg' 
import Effects from './effects.js'
export default function Square({piece, pos, state, specialProperty, sendMove}) {

  // When piece is dropped, check if it can be moved there, then move it
  // and send to backend
  const [{isOver, canDrop}, drop] = useDrop({
    accept: 'Piece',
    drop: (item) => {
      console.log("dropping")
      const src_pos = item.id.split("_")[0];
      const dest_pos= pos;
      console.log(src_pos + " to " + dest_pos);
      const validMove = state.boardState.canMovePiece(src_pos, dest_pos)
      if (validMove) {
        sendMove(src_pos, dest_pos)
        console.log("considered valid move")
        // IDEA: Instead of moving/updating, let's send to the backend first.
        // Then, we will wait for the backend to emit the move to both players
        // That sends the boards to be rendered by each player
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

    console.log(pos, specialProperty)

    let backgroundUrl = getBackgroundUrlForProperty(specialProperty)
    const opacity = specialProperty === null ? 0 : 0.4
    const pieceWrapperStyle = {
      display: 'grid',
      height: '80px',
      width: '80px',
      zIndex: 1,
      backgroundColor: `${canDrop || isOver ? color : ""}`,
    }

    const backgroundImageStyle = {
      backgroundImage: `url(${backgroundUrl})`,
      backgroundSize: 'cover',
      gridColumn: 1,
      gridRow: 1,
      width: '80px',
      height: '80px',
      opacity: opacity
    }
  return (
    <div class='square' 
        style={pieceWrapperStyle}
        ref={drop}>
          <div style={backgroundImageStyle} />
          {piece !== null && <Piece piece={piece} pos = {pos} state= {state}></Piece>}
    </div>
  )
}

const getBackgroundUrlForProperty = (property) => {
  console.log(property, Effects.SPECIAL_SQUARE)
  switch (property) {
    case Effects.SPECIAL_SQUARE:
      return specialSquareBackground
    default: 
      return null
  }
}

