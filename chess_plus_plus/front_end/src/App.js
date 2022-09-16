import './App.css';
import StartGame from './setup/StartGame';
import SignInPage from './setup/SignInPage';

function App() {
  // 
  const isUserLoggedIn = () => {
    return true;
  }

  return (
    <>
      {isUserLoggedIn() ? (<StartGame />) : (<SignInPage />)}
    </>
  );
}

export default App;
