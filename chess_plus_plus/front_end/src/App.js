import './App.css';
import React, { useEffect, useState  } from 'react';
import SignInPage from './setup/SignInPage';
import HomePage from './setup/HomePage';

import { Route, Routes, Navigate } from 'react-router-dom';
import GamePage from './chess/GamePage';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('authentication')) || false
  );

  useEffect(() => {
    localStorage.setItem('authentication', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  // const isWhite = ...figure out is player is white or not


  return (
    <>
    <Routes>
        <Route path='/' element={isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn}/> : <Navigate replace to='/login' />} />
        <Route path='/login' element={isLoggedIn ? <Navigate replace to='/' /> : <SignInPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/game' element={isLoggedIn ? <GamePage /> : <Navigate replace to='/'/>} />
        <Route path='*' element={isLoggedIn ? <Navigate replace to='/' /> : <Navigate replace to='/login' />} />

    </Routes>
    </>
  );
} 
export default App;
