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
            position: "top-right",
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

    useEffect(() => {
        console.log("game page rerendered");
    });

    useEffect(() => {
        toast(showGameId, {
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
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

    let opponentHand = [...Array(numOpponentCards.current)].map((e, i) => (
        <div className="opponentCard" />
    ));
    console.log(numOpponentCards, opponentHand);
    return (
        <>
            <Banner setIsLoggedIn={setIsLoggedIn} />

            <ToastContainer enableMultiContainer containerId={'gameId'} position={toast.POSITION.TOP_CENTER}>
                <button>click me</button>
            </ToastContainer>

            <div class="gamePage">
                {color !== "" ? (
                    <Game
                        isWhite={color === "white"}
                        ws={socket.current}
                        id={searchParams.get("id")}
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
                    position="top-right"
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

const TransparentOverlay = ({ id, setShowOverlay }) => {
    return (
        <div style={transparentStyle}>
            <button
                style={closeOverlayButton}
                onClick={() => setShowOverlay(false)}
            >
                X
            </button>
            <div style={centerBox}>
                <p style={text}>
                    Send the below code to your friend to join the game
                </p>
                <div style={{ display: "flex" }}>
                    <p style={text}>{id}</p>
                    <button
                        style={copyButton}
                        onClick={() => {
                            navigator.clipboard.writeText(id);
                        }}
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

const transparentStyle = {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(10, 10, 10, .8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "2",
};

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
};

const closeOverlayButton = {
    position: "absolute",
    top: "5%",
    right: 0,
    width: "50px",
    height: "50px",
    color: "white",
    background: "transparent",
    border: "none",
};
