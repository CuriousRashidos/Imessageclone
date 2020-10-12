import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC9eztouhc-5bvyG5ddsAQE_pwfcL8S9Es",
  authDomain: "imessage-clone-15712.firebaseapp.com",
  databaseURL: "https://imessage-clone-15712.firebaseio.com",
  projectId: "imessage-clone-15712",
  storageBucket: "imessage-clone-15712.appspot.com",
  messagingSenderId: "584968980463",
  appId: "1:584968980463:web:79c4562adfcc9ea365d81a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
