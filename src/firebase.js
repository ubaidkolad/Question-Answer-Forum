import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDQ5WVj4AWKUfO3pDiuTxYvP6RLn27OzoA",
  authDomain: "react-firebase-30bde.firebaseapp.com",
  databaseURL: "https://react-firebase-30bde.firebaseio.com",
  projectId: "react-firebase-30bde",
  storageBucket: "react-firebase-30bde.appspot.com",
  messagingSenderId: "908074365913",
  appId: "1:908074365913:web:96e7e5dd433c4740985fc8",
  measurementId: "G-BZSBD82TVG"
};
// Initialize Firebase
firebase.initializeApp(config);

export default firebase;