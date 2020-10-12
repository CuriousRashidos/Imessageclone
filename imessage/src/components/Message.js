import React, { forwardRef } from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import * as timeago from "timeago.js";

const Message = forwardRef(
  (
    { id, contents: { email, timestamp, displayName, photo, message, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);
    return (
      <div
        ref={ref}
        className={`message ${user.email === email && "message__sender"}`}
      >
        <Avatar src={photo} />
        <p> {message}</p>
        <small>{timeago.format(new Date(timestamp?.toDate()))} </small>
      </div>
    );
  }
);

export default Message;
