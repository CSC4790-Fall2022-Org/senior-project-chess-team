import React from 'react'
import { renderMatches } from 'react-router-dom';
import Message from '../ui/message.js'
import '../ui/chat.css'

function clearInput(){
    document.getElementById("messageText").value = '';
}

export class ChatBox extends React.Component {
    constructor(props) {
        super();
        this.state = {
            messages : [],//this.getInitialMessages(this.props.initialMessages),
            message : ""
        }
        this.updateMessages = this.updateMessages.bind(this);
    }

    messageChanged(event) {
        this.setState({
          message: event.target.value
        });
    }

    sendMessage() {
        var message = this.state.message;
        this.props.ws.emit('sendMessage',
            JSON.stringify({
                message: message,
                isWhite: this.props.isWhite,
                game_id : this.props.id,
                date : new Date().toLocaleDateString
            })
        );
        clearInput();
        console.log('message sent on frontend')

    }

    updateMessages(updatedMessages) {
        console.log("updating messages")
        let newMessages = []
        updatedMessages.messages.forEach( (message) => {
            console.log(message);
            newMessages.push({
                    isMyMessage : message.isWhite === this.props.isWhite,
                    message : message.message,
                    username : message.username,
                    date : message.date
                }
            )
        }
        )
        console.log(newMessages)
        this.setState({
            messages: newMessages
        });
    }

    componentDidMount() {
        this.props.ws.on('updateMessages', this.updateMessages);
    }
    componentDidUpdate() {
        console.log("chat updated");
    }

    componentWillUnmount() {
        this.props.ws.removeListener('updateMessages');
    }

    render() {
        let messageLines = []
        this.state.messages.forEach( (message) => {
            messageLines.push(
                <Message
                    isMyMessage={message.isMyMessage}
                    message={message.message}
                    username={message.username}
                    date={message.date}
                ></Message>
            )
        });
        return (
            <section class="msger">


                <div class="chat">
                    <div class="chatBox">
                        {messageLines.map((message, index) => (
                            <span key={index}>{message}</span>
                        ))}
                    </div>
                </div>
                <div class='inputArea'>

                <input
                    type="text"
                    class="msger-input"
                    id="messageText"
                    value={this.state.message}
                    onChange={this.messageChanged.bind(this)}
                ></input>
                <button
                    class="msgr-send-btn"
                    onClick={this.sendMessage.bind(this)}
                >
                    send
                </button>
                </div>

            </section>
        );
    }
}