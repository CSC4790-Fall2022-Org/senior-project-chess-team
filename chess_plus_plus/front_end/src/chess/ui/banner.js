import React from 'react';
import '../ui/banner.css'
import logo from '../files/Logo.png'
import logout from '../files/signOut.png'

function Banner({setIsLoggedIn}) {
    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('oauth');
    }

    const openRules = () => {
        window.location.href = 'rules'
    }
    return (
    <div class = "banner">
        <ul class ="navbar">
            <li class="LogoHomePageDiv"><a class="active" href="/"><img src={logo} class="LogoHomePage"></img></a></li>
            <li class="LogoutHomePageDiv"><a onClick={pseudoLogout}><img src={logout} class="LogoutHomePage"></img></a></li>
            <li class="RulesPageButton"><p onClick={openRules}>Rules</p></li>
        </ul>
    </div>
    )
}

export default Banner;