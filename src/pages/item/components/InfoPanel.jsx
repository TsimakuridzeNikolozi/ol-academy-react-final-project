import React from "react";
import { Card, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";

const InfoPanel = ({ fragrance }) => {
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
        <CardTitle tag="h5" style={titleStyle}>
          {fragrance.name}
        </CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted" style={brandStyle}>
          {fragrance.brand}
        </CardSubtitle>
        <CardText style={textStyle}>Rating: {fragrance.rating}</CardText>
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
