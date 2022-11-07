import React from 'react'
import '../ui/chat.css'

export default function Message({isMyMessage, message, username}) {
    if (isMyMessage) {
        return (
            <div class={"myMessage"}>
              {message}
            </div>
          )
    }
    else {
        return (
            <div class={"oppMessage"}>
              {username}: {message}
            </div>
          )
    }
}
