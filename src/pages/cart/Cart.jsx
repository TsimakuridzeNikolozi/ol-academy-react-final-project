import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, ListGroup, ListGroupItem } from "reactstrap";
import { useLocalStorage } from "usehooks-ts";
import CartItemCard from "./components/CartItemCard";
import { useDB } from "../../hooks/useDB";
import ItemContextMenu from "./components/ItemContextMenu";
import CheckoutForm from "./components/CheckoutForm";

const Cart = () => {
  const [cartItems] = useLocalStorage("cartItems", []);
  const { fragranceList } = useDB();
  const fragrancesById = useMemo(() => {
    const fragrancesByIdMap = new Map();
    fragranceList.forEach((fragrance) => {
      fragrancesByIdMap.set(fragrance.id, fragrance);
    });

    return fragrancesByIdMap;
  }, [fragranceList]);

  // Context menu implementation
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: "",
  });

  const contextMenuRef = useRef();

  const handleRightClick = (event, item) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.pageX,
      y: event.pageY,
      item,
    });
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (
        contextMenu.visible &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu({ ...contextMenu, visible: false });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [contextMenu]);

  return (
    <Container style={{ minHeight: "100vh" }}>
      <h1>Cart</h1>
      <ListGroup className="p-3 p-sm-6 bg-light">
        {cartItems.map((item) => {
          return (
            <>
              <ListGroupItem
                onContextMenu={(e) =>
                  handleRightClick(e, fragrancesById?.get(item.id))
                }
                key={item.id}
                className="border-dark"
              >
                <CartItemCard fragrance={fragrancesById?.get(item.id) || {}} />
              </ListGroupItem>
            </>
          );
        })}
      </ListGroup>
      {contextMenu.visible && (
        <div
          ref={contextMenuRef}
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          }}
        >
          <ItemContextMenu item={contextMenu?.item} />
        </div>
      )}

      <CheckoutForm />
    </Container>
  );
};

export default Cart;
