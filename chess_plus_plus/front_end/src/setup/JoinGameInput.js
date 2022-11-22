import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './JoinGameInput.css';

function JoinGameInput({closeInput}) {
    const navigate = useNavigate();

    const joinGame = () => {
        navigate(`/game?id=${text}`);
    }

    const handleTextAreaChange = t => {
        setText(t.target.value);
    }

    const [text, setText] = useState('');

    return (
        <div class='joinGameInput'>
        <form onChange={handleTextAreaChange}> 
            <textarea class="input" />
        </form>
        <button onClick={joinGame}>join</button>
        <button class='closeGameInput' onClick={() => closeInput(false)}>close me</button>
        </div>
        
    )
}
export default JoinGameInput;