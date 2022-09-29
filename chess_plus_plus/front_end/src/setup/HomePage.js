import { useSearchParams } from "react-router-dom";

function HomePage({setIsLoggedIn}) {

    const pseudoLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('oauth');
    }
    return (
        <>
        <h1>home </h1>
        <button onClick={pseudoLogout}> logout </button>
        </>
    )
}

export default HomePage;