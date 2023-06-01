// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHInld_P6x633va49cgzzO1-4GdNMqW_Q",
  authDomain: "clone-chat-app-svusa.firebaseapp.com",
  projectId: "clone-chat-app-svusa",
  storageBucket: "clone-chat-app-svusa.appspot.com",
  messagingSenderId: "397183616300",
  appId: "1:397183616300:web:391addf4680aaffa029889"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
