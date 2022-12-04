import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createGameRoom } from "../api/gameRoom.js";
import PlayNowImage from '../chess/files/PlayNowImage.png';
import HowToPlayImage from '../chess/files/HowToPlayImage.png';
import SpecialSquareImage from '../chess/files/SquareWhite.png'
import './HomePage.css';
import JoinGameInput from './JoinGameInput.js';
import Banner from '../chess/ui/banner.js';
import Card from '../cards/Card.js';
import Effects from '../chess/ui/effects.js';
function HomePage({ setIsLoggedIn }) {
    const [showJoinGameInput, setShowJoinGameInput] = useState(false);
    
    const navigate = useNavigate();
    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('id_token');
    }
    //document.getElementById('textInput').className="show";

    const createGame = async () => {
        const response = await createGameRoom();
        if (response.ok) {
            const json = await response.json();
            const game_id = json.game_id;

            navigate(`/game?id=${game_id}`);
        }
    }

    return (
        <>
            <div class="overlay">
                <body>
                <Banner setIsLoggedIn={setIsLoggedIn} />

                    <div class="HowToPlay">
                        <img class="HowToPlayImage" src={HowToPlayImage}></img>
                        <div class = "Rules">
                            <div>
                                <img id="specialSquareRuleImage" src={SpecialSquareImage} alt='special square'/>
                                <p  class="rule">-Move to this square to get a card </p>
                            </div>
                            <div>
                                <Card name="Freeze" description={"Freezes a random enemy piece"} />
                                <p class='rule'>-Click on a card to use it</p>
                            </div>
                            <div>
                                <div id="specialPowerupsRule" />
                                <p class='rule'>-Cards are special powerups that change the tide of battle</p>
                            </div>
                            <div>
                                <div id="useCardsRule" />
                                <p class='rule'>-Don't be afraid to use your cards! You can only hold on to 3 at a time</p>
                            </div>
                            <div>
                                <div id="kingImage" />
                                <p class='rule'>-Win by placing your opponent's King in checkmate!</p>
                            </div>

                        </div>
                    </div>

                    <div class="play">
                        <img class="PlayNowImage" src={PlayNowImage}></img>
                        <button onClick={createGame} class="HomePageButton">Create Game</button>
                        <button class="HomePageButton" onClick={() => setShowJoinGameInput(true)}>Join Game</button>
                        {showJoinGameInput && <JoinGameInput closeInput={setShowJoinGameInput} />}
                        <p>{showJoinGameInput}</p>
                    </div>
                </body>
            </div>
            
        </>
    )
}

export default HomePage;