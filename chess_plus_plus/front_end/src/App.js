import './App.css';
import {  Link} from 'react-router-dom';
import React, { useEffect } from 'react';
import SignInPage from './setup/SignInPage';
import HomePage from './setup/HomePage';
import { Route, Routes, Navigate } from 'react-router-dom';
import {Game} from './chess/ui/game.js'

function App() {
  // 
  const isUserLoggedIn = () => {
    return false;
  }

  // const isWhite = ...figure out is player is white or not


  return (
    <>
    <Routes>
        <Route path='/login' element={<SignInPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
      <Link to="/"><p>/</p></Link>
      <Link to="/login"><p>login</p></Link>
      <Link to="/home"><p>home</p></Link>
    <Game isWhite={true}></Game>
    </>
  );
}

export default App;
