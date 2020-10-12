import React, { useEffect } from "react";
import "./App.css";
import IMessage from "./components/Imessage";
import { useSelector, useDispatch } from "react-redux";
import Login from "./components/Login";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";

function App() {
  let user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            photo: user.photoURL,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return <div className="App">{user ? <IMessage /> : <Login />}</div>;
}

export default App;
