import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { createGameRoom } from "../api/gameRoom.js";
import logo from '../chess/files/Logo.png';
import scroll from '../chess/files/scroll.png';
import buttons from '../chess/files/buttons.jpg';
import './HomePage.css';

function HomePage({setIsLoggedIn}) {

    const [text, setText] = useState('');
    const navigate = useNavigate();
    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('id_token');
    }

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
        <body class ="background"></body>
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
        </>
    )
}

export default HomePage;