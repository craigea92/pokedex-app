import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth, usersRef } from "../utils/FirebaseConfig";
import { addDoc, getDocs, query, where } from "@firebase/firestore";
import { setUserStatus } from "../app/slices/AppSlice";
import { useAppDispatch } from "../app/hooks";

function Login() {
  const dispatch = useAppDispatch();

  // Function to handle the login process
  const handleLogin = async () => {
    // Creating a new GoogleAuthProvider instance
    const provider = new GoogleAuthProvider();
    // Signing in with Google using a popup window
    const {
      user: { email, uid },
    } = await signInWithPopup(firebaseAuth, provider);
    
    // Checking if the email is available
    if (email) {
      // Creating a Firestore query to fetch the user based on the uid
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      // Fetching the user data from Firestore
      const fetchedUser = await getDocs(firestoreQuery);
      // If the user doesn't exist in Firestore, add the user to the collection
      if (fetchedUser.docs.length === 0) {
        await addDoc(usersRef, { uid, email });
      }
      // Dispatching an action to set the user status in the app state
      dispatch(setUserStatus({ email }));
    }
  };
  return (
    <div className="login">
      <button className="login-btn" onClick={handleLogin}>
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
}

export default Login;
