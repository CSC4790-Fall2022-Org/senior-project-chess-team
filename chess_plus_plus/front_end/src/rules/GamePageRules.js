import { useState } from "react";
import './GamePageRules.css'
function GamePageRules() {
    const [tab, setTab] = useState(2);

    return (
        <div class="gamePageRules">
            <div class="tabs">
                <ul class="tabsBar">
                    <li class={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>General</li>
                    <li class={tab === 2 ? "active" : ""} onClick={() => setTab(2)}>Pieces</li>
                    <li class={tab === 3 ? "active" : ""} onClick={() => setTab(3)}>Cards</li>
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
        <p style={{textAlign: 'center'}}>General</p>
    )
}

const PieceRules = () => {
    return (
        <p style={{textAlign: 'center'}}>Pieces</p>
    )
}

const CardRules = () => {
    return (
        <p style={{textAlign: 'center'}}>Cards</p>
    )
}
export default GamePageRules;