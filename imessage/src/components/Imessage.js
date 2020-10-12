import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import "./imessage.css";

function IMessage() {
  return (
    <div className="imessage">
      <Sidebar />
      <Chat />
    </div>
  );
}

export default IMessage;
