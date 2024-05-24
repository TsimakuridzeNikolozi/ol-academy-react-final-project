import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { useCart } from "../../../hooks/useCart";
import { ReactComponent as CartIcon } from "../../../assets/images/CartIcon.svg";

const InfoPanel = ({ fragrance }) => {
  const { fragranceInCart, addFragranceToCart } = useCart({
    fragranceId: fragrance.id,
  });

  if (!fragrance) {
    return null;
  }

  const cardStyle = {
    padding: "20px",
    borderRadius: "10px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const brandStyle = {
    fontSize: "20px",
    marginBottom: "20px",
  };

  const textStyle = {
    fontSize: "16px",
    marginBottom: "10px",
  };

  return (
    <Card style={cardStyle}>
      <CardBody>
        <div className="d-flex align-items-center justify-content-between">
          <CardTitle tag="h5" style={titleStyle}>
            {fragrance.name}
          </CardTitle>
          {!fragranceInCart ? (
            <Button color="success" onClick={() => addFragranceToCart()}>
              <CartIcon style={{ width: "20px", height: "20px" }} />
            </Button>
          ) : (
            <Button color="secondary" disabled>
              In Cart
            </Button>
          )}
        </div>
        <CardSubtitle tag="h6" className="mb-2 text-muted" style={brandStyle}>
          {fragrance.brand}
        </CardSubtitle>
        <CardText style={textStyle}>
          Concentration: {fragrance.concentration}
        </CardText>
        <CardText style={textStyle}>
          Notes: {fragrance.notes.join(", ")}
        </CardText>
        <CardText style={textStyle}>Perfumer: {fragrance.perfumer}</CardText>
        <CardText style={textStyle}>
          Description: {fragrance.description}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default InfoPanel;
