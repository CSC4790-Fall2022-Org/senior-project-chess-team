import React from 'react'
import {useDrag, DragPreviewImage, DndProvider} from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend"
import '../ui/game.css'

export default function Piece(props) {

    // React dnd info from https://www.youtube.com/watch?v=kBR7pDLcC3A&t=990s&ab_channel=EstebanCodes
    let imageUrl = "";
    let type = 'None';
    let isWhite = 'None';
    let piece = props.piece;
    if (piece !== null) {
        imageUrl = piece.getImageUrl();
        type = piece.type;
        isWhite = piece.isWhite;
    }
    const [, drag, preview] = useDrag({
        item: { id: `${type}_${isWhite}`},
        type: type,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
          })
    })
//<DragPreviewImage connect={preview} src={imageUrl}/>
    return (
        <>
        <DndProvider backend={HTML5Backend}>
            <DragPreviewImage connect={preview} src={imageUrl}/>
            <div class='piece' style={{backgroundImage: `url(${imageUrl})`}} ref={drag}></div>
        </DndProvider>
        </>
    )
}
