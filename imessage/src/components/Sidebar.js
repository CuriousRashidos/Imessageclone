import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarChat from "./SidebarChat";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewOutlinedIcon from "@material-ui/icons/RateReviewOutlined";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db, auth } from "../firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) => {
      setChat(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const addChat = () => {
    const chatName = prompt("Enter channel name");
    if (chatName) {
      db.collection("chats").add({ chatName: chatName });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          className="sidebar__avatar"
          onClick={() => auth.signOut()}
          src={user.photo}
        />

        <div className="sidebar__input">
          <SearchIcon />
          <input type="text" placeholder="Who's up?" />
        </div>
        <IconButton
          onClick={addChat}
          variant="outlined"
          className="sidebar__inputButton"
        >
          <RateReviewOutlinedIcon />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chat.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
