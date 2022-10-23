import React from 'react';
import '../ui/banner.css'

export default function Banner({setIsLoggedIn}) {
    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('oauth');
    }
    return (
    <ul>
        <li><a class="active" href="#home">CHESS++</a></li>
        <li><a>Play</a></li>
        <li><a href="/realhomepage">Rules</a></li>
        <li class = "right"><a href="#logout" onClick={pseudoLogout} > Logout </a></li>
        <li class = "right"><a href="#settings" class = "right">Settings</a></li>
    </ul>
    )
}