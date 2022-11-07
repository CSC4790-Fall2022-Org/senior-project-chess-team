import React from 'react'

export default function PromotionPiece(props) {

    // React dnd info from https://www.youtube.com/watch?v=kBR7pDLcC3A&t=990s&ab_channel=EstebanCodes
    let imageUrl = "";
    let type = 'None';
    let piece = props.piece;
    if (piece !== null) {
        imageUrl = piece.imageUrl;
        type = piece.type;
    }

    console.log(type)
    return (
        <>
            <img src={`${imageUrl}`}
             onClick={() => {props.selection(type)}}
              alt={`Piece of type ${type}`}
              class='promotionPiece'/>
        </>
    )
}

