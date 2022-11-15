import { hasCustomState } from '@aws-amplify/auth/lib-esm/types/Auth.js';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createGameRoom } from "../api/gameRoom.js";
import logo from '../chess/files/Logo.png';
import logout from '../chess/files/signOut.png';
import PlayNowImage from '../chess/files/PlayNowImage.png';
import HowToPlayImage from '../chess/files/HowToPlayImage.png';
import './HomePage.css';

function HomePage({ setIsLoggedIn }) {

    const [text, setText] = useState('');
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

    const joinGame = () => {
        navigate(`/game?id=${text}`);
    }

    const handleTextAreaChange = t => {
        setText(t.target.value);
    }
    return (
        <>
            <div class="overlay">
                <body>
                    <ul class ="navbar">
                        <li class="LogoHomePageDiv"><a class="active" href="#home"><img src={logo} class="LogoHomePage"></img></a></li>
                        <li class="LogoutHomePageDiv"><a onClick={pseudoLogout}><img src={logout} class="LogoutHomePage"></img></a></li>
                    </ul>

                    <div class="HowToPlay">
                        <img class="HowToPlayImage" src={HowToPlayImage}></img>
                        <ul class = "Rules">
                            <p>Move Piece</p>
                            <p>Get Card</p>
                            <p>Win</p>
                        </ul>
                    </div>

                    <div class="play">
                        <img class="PlayNowImage" src={PlayNowImage}></img>
                        <button onClick={createGame} class="HomePageButton">Create Game</button>
                        <button class="HomePageButton" onClick={joinGame}>Join Game</button>
                        <form onSubmit={joinGame} onChange={handleTextAreaChange}>
                            <textarea class="input" />
                        </form>
                        <button class="HomePageButton">Settings</button>
                    </div>
                    
                </body>
            </div>
            
        </>
    )
}

export default HomePage;