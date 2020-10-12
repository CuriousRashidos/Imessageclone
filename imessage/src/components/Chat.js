import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { IconButton } from "@material-ui/core";
import "./Chat.css";
import Message from "./Message";
import { selectChatId, selectChatName } from "../features/chatSlice";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function Chat() {
  const [messages, setMessages] = useState([]);
  const chatId = useSelector(selectChatId);
  const chatName = useSelector(selectChatName);
  const [input, setInput] = useState();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (chatId) {
      db.collection("chats")
        .doc(chatId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input !== "") {
      db.collection("chats").doc(chatId).collection("messages").add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
    }
    console.log(input);
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <h4>
          To:
          <span className="chat__name"> {chatName}</span>
        </h4>
        <strong> details </strong>
      </div>
      <div className="chat__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} contents={data} />
          ))}
        </FlipMove>
      </div>
      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={({ target }) => setInput(target.value)}
            type="text"
            placeholder="Enter message"
          />

          <button onClick={sendMessage}> Send Message</button>
        </form>
        <IconButton>
          <MicNoneIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
