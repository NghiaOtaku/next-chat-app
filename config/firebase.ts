// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlo5we18f2He9pjFoVpDbbYQ3oePRz4AI",
  authDomain: "clone-chat-app-86f2e.firebaseapp.com",
  projectId: "clone-chat-app-86f2e",
  storageBucket: "clone-chat-app-86f2e.appspot.com",
  messagingSenderId: "1021881857819",
  appId: "1:1021881857819:web:3b552593f8063693ba45be"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
