import { createContext, useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(currentUser);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (auth?.currentUser) setCurrentUser(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ currentUser, signInWithGoogle, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContext;
