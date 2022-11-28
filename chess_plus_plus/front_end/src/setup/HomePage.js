import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createGameRoom } from "../api/gameRoom.js";
import PlayNowImage from '../chess/files/PlayNowImage.png';
import HowToPlayImage from '../chess/files/HowToPlayImage.png';
import './HomePage.css';
import JoinGameInput from './JoinGameInput.js';
import Banner from '../chess/ui/banner.js';

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
                        <ul class = "Rules">
                            <p>-Move Piece</p>
                            <p>-Get Card</p>
                            <p>-Win</p>
                        </ul>
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