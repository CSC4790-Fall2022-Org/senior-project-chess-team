import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { createGameRoom } from "../api/gameRoom.js";
import {Game} from '../chess/ui/game.js'

function HomePage({setIsLoggedIn}) {

    const [text, setText] = useState('');
    const navigate = useNavigate();
    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('id_token');
    }

    const createGame = async () => {
        const response = await createGameRoom();
        console.log('response ', response.ok)
        if (response.ok) {
            const json = await response.json();
            const game_id = json.game_id;


            navigate(`/game?id=${game_id}`);
        }
    }

    const joinGame = () => {
        console.log("first")
        console.log(text)
        navigate(`/game?id=${text}`);
    }

    const handleTextAreaChange = t => {
        setText(t.target.value);
    }
    return (
        <>
        <h1>home </h1>
        <button onClick={pseudoLogout}> logout </button>
        <br />
        <button onClick={createGame}>Create game</button>
        <br />
        <form onSubmit={joinGame} onChange={handleTextAreaChange}>
            <textarea />
            <button>Join game</button>
        </form>
        <Game isWhite={false}></Game>
        </>
    )
}

export default HomePage;