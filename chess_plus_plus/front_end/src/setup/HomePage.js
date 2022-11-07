import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { createGameRoom } from "../api/gameRoom.js";
import logo from '../chess/files/Logo.png';
import scroll from '../chess/files/scroll.png';
import banner from '../chess/ui/banner.js';
import './HomePage.css';

function HomePage({setIsLoggedIn}) {

    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('oauth');
    }
    return (
        <>
        <div class = "overlay">
        <body></body>
        <img src={logo} class="Logo" />
        <img src={scroll} class="Scroll" />
        <button onClick={pseudoLogout}> logout </button>
        <br />
        <button onClick={createGame} class = "createGame">Create game</button>
        <br />
        <form onSubmit={joinGame} onChange={handleTextAreaChange}>
            <textarea class = "input" />
            <button class = "joinGame">Join game</button>
        </form>
        </div>
        </>
    )
}

export default HomePage;