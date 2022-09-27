import './App.css';
import {  Link, useFetcher, useSearchParams} from 'react-router-dom';
import React, { useEffect, useState  } from 'react';
import SignInPage from './setup/SignInPage';
import HomePage from './setup/HomePage';
import { Route, Routes, Navigate, Redirect } from 'react-router-dom';


// import Game from './chess/ui/game'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('authentication') || false
  );

  useEffect(() => {
    localStorage.setItem('authentication', isLoggedIn);
  }, [isLoggedIn]);

  let content;
  if (isLoggedIn) {
    content = <HomePage setIsLoggedIn={setIsLoggedIn}/>
  }
  else {
    content = <SignInPage setIsLoggedIn={setIsLoggedIn} />
  }
  return (
    <>
    <Routes>
        <Route path='/home/:sessionId' element={<HomePage />} />
        <Route path='*' element={<Navigate to="/login" replace />} />
    </Routes>
      {content}
    </>
  );
} 
export default App;
