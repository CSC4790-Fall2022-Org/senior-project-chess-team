import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SignInPage from './setup/SignInPage';
import HomePage from './setup/HomePage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
