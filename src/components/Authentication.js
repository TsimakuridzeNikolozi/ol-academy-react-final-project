import { Button, ButtonGroup } from "reactstrap";
import { auth, googleProvider } from "../config/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { ReactComponent as CartIcon } from "../assets/images/CartIcon.svg";
import { Link } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../constants";

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
    <>
      {currentUser ? (
        <ButtonGroup>
          <Button
            color="info"
            outline
            style={{
              height: "50px",
            }}
          >
            <Link
              to={NAVIGATION_ROUTES.user}
              className="d-flex align-items-center gap-1"
            >
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                width="30"
                height="30"
                style={{ borderRadius: "50%" }}
              />
              <span className="d-none d-sm-block">
                {currentUser.displayName}
              </span>
            </Link>
          </Button>
          <Button outline>
            <Link to={NAVIGATION_ROUTES.cart}>
              <CartIcon width="30" height="30" />
            </Link>
          </Button>
          <Button
            outline
            onClick={logout}
            style={{
              height: "50px",
            }}
          >
            Sign Out
          </Button>
        </ButtonGroup>
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
    </>
  );
};
