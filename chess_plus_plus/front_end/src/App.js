import './App.css';
import {  Link, useFetcher, useSearchParams} from 'react-router-dom';
import React, { useEffect, useState  } from 'react';
import SignInPage from './setup/SignInPage';
import HomePage from './setup/HomePage';
import { Route, Routes, Navigate, Redirect } from 'react-router-dom';


// import Game from './chess/ui/game'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('authentication')) || false
  );

  useEffect(() => {
    localStorage.setItem('authentication', JSON.stringify(isLoggedIn));
    console.log(JSON.parse(localStorage.getItem('authentication')))
  }, [isLoggedIn]);

  return (
    <>
    <Routes>
        <Route path='*' element={isLoggedIn ? <Navigate replace to='/' /> : <Navigate replace to='/login' />} />
        <Route path='/' element={isLoggedIn ? <HomePage setIsLoggedIn={setIsLoggedIn}/> : <Navigate replace to='/login' />} />
        <Route path='/login' element={isLoggedIn ? <Navigate replace to='/' /> : <SignInPage setIsLoggedIn={setIsLoggedIn} />} />
    </Routes>
    </>
  );
} 
export default App;
