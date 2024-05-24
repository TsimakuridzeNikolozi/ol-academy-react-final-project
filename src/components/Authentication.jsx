import { Badge, Button, ButtonGroup } from "reactstrap";
import { ReactComponent as CartIcon } from "../assets/images/CartIcon.svg";
import { Link } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../constants";
import { useAuthentication } from "../hooks/useAuthentication";
import { useLocalStorage } from "usehooks-ts";

export const Authentication = () => {
  const { currentUser, signInWithGoogle, logout } = useAuthentication();
  const [cartItems] = useLocalStorage("cartItems", []);
  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

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
              <Badge>{cartItemsCount}</Badge>
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
        <ButtonGroup>
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
          <Button outline>
            <Link to={NAVIGATION_ROUTES.cart}>
              <CartIcon width="30" height="30" />
              <Badge>{cartItemsCount}</Badge>
            </Link>
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};
