import './card.css'

import frozenCrossImage from './cardImages/cross.png'
import reviveImage from './cardImages/revive.png'
import snowflakeImage from './cardImages/snowflake.png'
import swapImage from './cardImages/swap.png'

function Card({name, description, id, playCard}) {
    // determine image based on name
    return (
        <div>
            <div class='card' onClick={() => playCard(id)}>
                <img src={getSource(name)} />
            </div>
        </div>

    )

    
}

const getSource = name => {
    switch (name) {
        case 'Freeze':
            return snowflakeImage;
        case 'Frozen Cross':
            return frozenCrossImage
        case 'Resurrect':
            return reviveImage;
        case 'Swap Hands':
            return swapImage
        case 'Demote piece':
            return null
        default:
            return null
    }
}

export default Card