import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
const source =
  "https://upload.wikimedia.org/wikipedia/commons/5/56/IMessage_logo_%28Apple_Inc.%29.png";
function Login() {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__logo">
        <img src={source} />
      </div>
      Welcome to IMessage
      <Button onClick={signIn}> Sign in</Button>
    </div>
  );
}

export default Login;
