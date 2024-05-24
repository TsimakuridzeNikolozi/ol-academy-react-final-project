import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import { NAVIGATION_ROUTES } from "../../../constants";
import { useCart } from "../../../hooks/useCart";

const CartItemCard = ({ fragrance }) => {
  const { itemQuantity, handleIncrease, handleDecrease, handleRemove } =
    useCart({ fragranceId: fragrance.id });

  if (!fragrance) {
    return;
  }

  return (
    <div className="p-3 d-flex flex-column flex-sm-row align-items-center gap-3">
      <img
        src={fragrance.imageSources?.at(0)}
        alt={fragrance.name}
        style={{ width: "150px", height: "150px" }}
      />
      <div className="d-flex flex-column align-items-start gap-2">
        <div className="d-flex flex-column align-items-start gap-1">
          <Link to={`${NAVIGATION_ROUTES.item}/${fragrance.id}`}>
            <h3>
              {fragrance.name} {fragrance.concentration}
            </h3>
          </Link>
          <h4>Price: {fragrance.price}$</h4>
          <h6>Brand: {fragrance.brand}</h6>
        </div>
        <ButtonGroup>
          <Button onClick={handleIncrease}>+</Button>
          <Button color="success" disabled onClick={handleIncrease}>
            {itemQuantity}
          </Button>
          <Button disabled={itemQuantity === 1} onClick={handleDecrease}>
            -
          </Button>
          <Button color="danger" onClick={handleRemove}>
            Remove
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default CartItemCard;
