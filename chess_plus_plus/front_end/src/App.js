import './App.css';
import {  Link} from 'react-router-dom';
// import Game from './chess/ui/game'

function App() {
  // 
  const isUserLoggedIn = () => {
    return false;
  }

  return (
    <>
        <Link to="/"><p>/</p></Link>
        <Link to="/login"><p>login</p></Link>
        <Link to="/home"><p>home</p></Link>
    </>
  );
}

export default App;
