import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import serverURL from "../config/serverConfig";
import { Game } from "../chess/ui/game.js";
import { ChatBox } from "../chess/ui/chatBox.js";
import "../chess/ui/gamePage.css";
import logo from "../chess/files/Logo.png";
import logout from "../chess/files/signOut.png";
import Hand from "../cards/Hand";
import Banner from "./ui/banner";
import GamePageRules from "../rules/GamePageRules";

export default function GamePage({ setIsLoggedIn }) {
    const socket = useRef(null);
    const numOpponentCards = useRef(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [color, setColor] = useState("");
    const [cards, setCards] = useState([]);
    const [showOverlay, setShowOverlay] = useState(true);

    const gameId = searchParams.get('id')
    useEffect(() => {
        const newSocket = io(serverURL(), {
            path: "/game/socket.io",
            query: `gameId=${searchParams.get(
                "id"
            )}&idToken=${localStorage.getItem("id_token")}`,
        });

        socket.current = newSocket;

        newSocket.on("clientColor", (color) => {
            console.log("color", color);
            setColor(color);
        });

        newSocket.on("disconnect", (reason) => {
            console.log("disconnect because: ", reason);
            console.log("we disconnected");
        });

        newSocket.on("error", (text) => toast.error(text.text, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            containerId: 'Errors'
            }));

        newSocket.on("updateHand", (cards) => {
            numOpponentCards.current = cards.opponentCardCount;
            setCards(cards.cards);
        });

        return () => {
            newSocket.close();
            console.log("why are we here?");
        };
    }, [socket, searchParams]);

    const openRules = () => {
        window.location.href = 'rules'
    }

    useEffect(() => {
        console.log("game page rerendered");
    });

    useEffect(() => {
        toast(showGameId, {
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            containerId: 'gameId',
            })
    }, [showOverlay])

    const showGameId = () => (
        <div style={centerBox}>
                <p >
                    Send the below code to your friend to join the game
                </p>
                <div style={{ display: "flex" }}>
                <p style={text}>{gameId}</p>
                    <button
                        style={copyButton}
                        onClick={() => {
                            navigator.clipboard.writeText(gameId);
                        }}
                    >
                        Copy
                    </button>
                </div>
            </div>
    )

    const playerWon = () => {
        console.log('we won entered')
        toast.success(winnerToast, {
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            containerId: 'gameId',
            })
    }

    const playerLost = () => {
        console.log('we lost entered')
        toast.error(loserToast, {
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            containerId: 'gameId',
            })

    }
    let opponentHand = [...Array(numOpponentCards.current)].map((e, i) => (
        <div className="opponentCard" />
    ));
    console.log(numOpponentCards, opponentHand);

    const returnToHome = () => {
        window.location.href = window.location.hostname
    }
    
    const winnerToast = () => (
        <div display={{display: 'flex', flexDirection: 'row'}}>
            <p>You win!</p>
            <button onClick={returnToHome}>Return to home</button>
        </div>
    )
    
    const loserToast = () => (
        <div display={{display: 'flex', flexDirection: 'row'}}>
            <p>You lost! Better luck next time.</p>
            <button onClick={returnToHome}>Return to home</button>
        </div>
    )

    const forfeitGame = () => {
        socket.current.emit('forfeit', {
            game_id: gameId,
        })
    }

    const showForfeitToast = () => {
        const message = (
            <>
            Are you sure you'd like to forfeit?
            <button onClick={forfeitGame} style={{width: '50%', right: '0px'}}>I'm sure</button>
            </>
        )
        toast.warn(message, {
            containerId: 'gameId',
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }
    return (
        <>
            <div class="gamePageBannerWrapper">
                <Banner setIsLoggedIn={setIsLoggedIn} />
            </div>

            <ToastContainer enableMultiContainer containerId={'gameId'} position={toast.POSITION.TOP_CENTER}/>

            <div class="gamePage">
            <div class="howToPlayContainer">
                <GamePageRules />
            </div>
                {color !== "" ? (
                    <Game
                        isWhite={color === "white"}
                        ws={socket.current}
                        id={searchParams.get("id")}
                        playerWon={playerWon}
                        playerLost={playerLost}
                    />
                ) : (
                    <p>Waiting for response...</p>
                )}

                <div class="LargeContainer">
                    {color !== "" ? (
                        <ChatBox
                            isWhite={color === "white"}
                            ws={socket.current}
                            id={searchParams.get("id")}
                        ></ChatBox>
                    ) : (
                        <p></p>
                    )}
                    <div class = "randomButtons">
                        <button class='forfeitButton' onClick={showForfeitToast}>Forfeit</button>
                        <button class='forfeitButton' onClick={openRules}>Rules</button>
                    </div>
                    <div class="PowerUps" style={{ width: "100%" }}>
                        {color !== "" && (
                            <Hand
                                ws={socket.current}
                                id={searchParams.get("id")}
                                cards={cards}
                                gameId={searchParams.get("id")}
                            />
                        )}
                    </div>
                    <div class="opponentHand">{opponentHand}</div>
                </div>
                
                <ToastContainer
                    enableMultiContainer
                    containerId={'Errors'}
                    position="top-center"
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </div>
        </>
    );

    
}


const centerBox = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0px 0px 0px 0px",
};

const text = {
    fontSize: "18px",
};

const copyButton = {
    height: "32px",
    minWidth: "50px",
    flex: "1 0",
    z: 100,
    marginLeft: '5px',
};
