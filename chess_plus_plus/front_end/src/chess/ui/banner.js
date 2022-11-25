import React from 'react';
import '../ui/banner.css'

export default function Banner({setIsLoggedIn}) {
    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('oauth');
    }
    return (
    <div class = "banner">
    </div>
    )
}