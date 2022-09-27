import { useSearchParams } from "react-router-dom";

function HomePage({setIsLoggedIn}) {


    let [searchParams, setSearchParams] = useSearchParams();
    // 

      
    const doThing = () => {
        setIsLoggedIn(false);
    }
    return (
        <>
        <h1>home </h1>
        <button onClick={doThing}> login </button>
        </>
    )
}

export default HomePage;