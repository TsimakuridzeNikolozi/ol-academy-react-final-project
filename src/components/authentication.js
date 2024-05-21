import { Button, ButtonGroup } from "reactstrap";
import { auth, googleProvider } from "../config/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";

export const Authentication = () => {
  const [currentUser, setCurrentUser] = useState(null);

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
    <ButtonGroup>
      {currentUser ? (
        <Button
          color="info"
          outline
          disabled
          className="d-flex align-items-center gap-1"
          style={{
            height: "50px",
          }}
        >
          <img
            src={currentUser.photoURL}
            alt={currentUser.displayName}
            width="30"
            height="30"
            style={{ borderRadius: "50%" }}
          />
          <span>{currentUser.displayName}</span>
        </Button>
      ) : (
        <Button
          color="primary"
          outline
          onClick={signInWithGoogle}
          style={{
            height: "50px",
          }}
        >
          Sign In With Google
        </Button>
      )}
      <Button
        outline
        onClick={logout}
        style={{
          height: "50px",
        }}
      >
        Logout
      </Button>
    </ButtonGroup>
  );
};
