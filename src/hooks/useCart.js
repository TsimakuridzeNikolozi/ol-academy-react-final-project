import { useCallback, useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useCart = ({ fragranceId }) => {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const fragranceInCart = useMemo(() => {
    return cartItems.find((item) => item.id === fragranceId);
  }, [cartItems, fragranceId]);

  const itemQuantity = useMemo(() => {
    return cartItems.find((item) => item.id === fragranceId)?.quantity;
  }, [fragranceId, cartItems]);

  const addFragranceToCart = useCallback(() => {
    setCartItems((prev) => [...prev, { id: fragranceId, quantity: 1 }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fragranceId]);

  const handleIncrease = useCallback(() => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === fragranceId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, fragranceId]);

  const handleDecrease = useCallback(() => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === fragranceId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, fragranceId]);

  const handleRemove = useCallback(() => {
    const updatedCartItems = cartItems.filter(
      (item) => item.id !== fragranceId
    );
    setCartItems(updatedCartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, fragranceId]);

  return {
    cartItems,
    fragranceInCart,
    itemQuantity,
    addFragranceToCart,
    handleIncrease,
    handleDecrease,
    handleRemove,
  };
};
