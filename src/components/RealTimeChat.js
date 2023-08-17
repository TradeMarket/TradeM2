import React from "react";
import {getDatabase, ref, set} from 'firebase/database';
import { useLocation } from "react-router-dom";
export default function RealTimeChat() {
  //from singleproduct the userId or username is passed in through a state
  //maybe use use location
  let {state} = useLocation();
  const userName = state.username;

  const dbRef = getDatabase();

  function sendMessage(e) {
    e.preventDefault();
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    messageInput.value = "";

    //auto scroll to the bottom
    document.getElementById("messages").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

    
    set(ref(dbRef, 'Messages/' + timestamp), {
      userName,
      message,
    });
  }

  const fetchChat = ref(dbRef, 'Messages/');

  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      userName === messages.userName ? "sent" : "receive"
    }><span>${messages.userName}: </span>${messages.message}</li>`;

    document.getElementById("messages").innerHTML += message;
  });
  return (
    <div>
      <h2>Chat</h2>
      <div id="chat">
        {
          //messages will display here
        }
        <ul id="messages"></ul>

        {
          //form to send message
        }
        <form id="message-form">
          <input id="message-input" type="text" />
          <button id="message-btn" type="submit" onClick={e => sendMessage(e)}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
