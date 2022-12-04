import { useState } from "react";
import './GamePageRules.css'
function GamePageRules() {
    const [tab, setTab] = useState(1);

    return (
        <div class="gamePageRules">
            <div class="tabs">
                <ul class="tabsBar">
                    <li>General</li>
                    <li>Pieces</li>
                    <li>Cards</li>
                </ul>
            </div>
            <div class="rulesSection">
                {tab === 1 && <GeneralRules />}
                {tab === 2 && <PieceRules />}
                {tab === 3 && <CardRules />}
            </div>
        </div>
    )
}

const GeneralRules = () => {
    return (
        <p>general</p>
    )
}

const PieceRules = () => {
    return (
        <p>piece</p>
    )
}

const CardRules = () => {
    return (
        <p>cards</p>
    )
}
export default GamePageRules;