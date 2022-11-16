import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import io from "socket.io-client";
import serverURL from "../config/serverConfig";
import { Game } from "../chess/ui/game.js";
import { ChatBox } from "../chess/ui/chatBox.js";
import "../chess/ui/gamePage.css";
import logo from "../chess/files/Logo.png";
import logout from "../chess/files/signOut.png";
import Hand from "../cards/Hand";

export default function GamePage() {
    const socket = useRef(null);
    const numOpponentCards = useRef(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [color, setColor] = useState("");
    const [cards, setCards] = useState([]);
    const [showOverlay, setShowOverlay] = useState(true);

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

        newSocket.on("error", (text) => alert(text.text));

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

    return (
        <>
            {showOverlay && (
                <TransparentOverlay
                    id={searchParams.get("id")}
                    setShowOverlay={setShowOverlay}
                />
            )}
            <ul class="navbar">
                <li class="LogoHomePageDiv">
                    <a class="active" href="#home">
                        <img src={logo} class="LogoHomePage"></img>
                    </a>
                </li>
                <li class="LogoutHomePageDiv">
                    <a>
                        <img src={logout} class="LogoutHomePage"></img>
                    </a>
                </li>
            </ul>
            <div class="gamePage">
                <div class="board">
                    {color !== "" ? (
                        <Game
                            isWhite={color === "white"}
                            ws={socket.current}
                            id={searchParams.get("id")}
                        />
                    ) : (
                        <p>Waiting for response...</p>
                    )}
                </div>

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
                    <div class="opponentCard">
                        <p>Opponent has {numOpponentCards.current} cards</p>
                    </div>
                </div>
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
    fontSize: "32px",
    color: "white",
    marginBottom: "auto",
};

const copyButton = {
    height: "32px",
    minWidth: "50px",
    flex: "1 0",
    z: 100,
};

const closeOverlayButton = {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50px",
    height: "50px",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0)",
};
