import { useState } from 'react';
import { useNavigate } from "react-router-dom";

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
        <>
        <form onSubmit={joinGame} onChange={handleTextAreaChange}> 
            <textarea class="input" />
            <input type="submit" />
        </form>
        <button onClick={() => closeInput(false)}>close me</button>
        </>
    )
}
export default JoinGameInput;