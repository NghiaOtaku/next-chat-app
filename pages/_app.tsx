import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/globals.css";
import Login from "./login";
import { auth, db } from "../config/firebase";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";

function MyApp({ Component, pageProps }) {
  const [loggedInUser, loading, _error] = useAuthState(auth);

  // console.log("loggedInUser", loggedInUser);

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, "users", loggedInUser?.email),
          {
            email: loggedInUser?.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInUser?.photoURL,
          },
          { merge: true }
        );
      } catch (err) {
        console.log("set user error", err);
      }
    };

    if (loggedInUser) {
      setUserInDb();
    }
  }, [loggedInUser]);

  if (loading) return <Loading />;

  if (!loggedInUser) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
