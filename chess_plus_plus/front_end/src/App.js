import './App.css';
import {  Link} from 'react-router-dom';
import React, { useEffect } from 'react';
import SignInPage from './setup/SignInPage';
import HomePage from './setup/HomePage';
import { Route, Routes, Navigate, Redirect } from 'react-router-dom';
// import Game from './chess/ui/game'

function App() {
  // 
  const isUserLoggedIn = () => {
    const searchParams = new URL(window.location.href).searchParams;
    return searchParams.get("code") !== null;
  }

  let content;
  if (isUserLoggedIn()) {
    content = <HomePage />
  }
  else {
    content = <SignInPage />
  }
  return (
    <>
    <Routes>
        <Route path='/login' element={<SignInPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='*' element={<Navigate to="/login" replace />} />
        <Route path='/redirect' element={<Navigate to={ cognitoUrl } />} />
    </Routes>
      <Link to="/"><p>/</p></Link>
      <Link to="/login"><p>login</p></Link>
      <Link to="/home"><p>home</p></Link>
      {content}
    </>
  );
} 
export default App;
