import React from 'react'
import {useDrag, DragPreviewImage, DndProvider} from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend"
import '../ui/game.css'
// import '../files/test_image/knight.png'

export default function Piece(props) {

    // React dnd info from https://www.youtube.com/watch?v=kBR7pDLcC3A&t=990s&ab_channel=EstebanCodes
    // let imageUrl = '../files/test_image/knight.png';
    let imageUrl = "";
    // let test_img = document.getElementById(div).src = "../files/test_image/knight.png";
    let type = 'None';
    let isWhite = 'None';
    let piece = props.piece;
    if (piece !== null) {
        imageUrl = piece.imageUrl; 
        type = piece.type;
        isWhite = piece.isWhite;
    }
    const [{isDragging}, drag, preview] = useDrag({
        item: { id: `${props.pos}_${type}_${isWhite}`},
        type: 'Piece',
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
          })
    })

    return (
        <>
        <DndProvider backend={HTML5Backend}>
            <DragPreviewImage connect={preview} src={imageUrl} />
            <div class={props.state.boardState.playerIsWhite === piece.isWhite ? 'my-piece' : 'opp-piece'}
            style={{backgroundImage: `url(${imageUrl})`, opacity: `${isDragging ? 0 : 1}`, gridColumn: 1,
            gridRow: 1, width: '80px', height: '100%'}}
            ref={props.state.boardState.playerIsWhite === piece.isWhite ? drag : null}>
            </div> 
        </DndProvider>
        </>
    )
}
