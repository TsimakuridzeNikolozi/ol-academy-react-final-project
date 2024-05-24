import React from "react";
import { Card, CardHeader, ListGroup, ListGroupItem } from "reactstrap";

const ItemContextMenu = ({ item }) => {
  const propertiesToShow = [
    "name",
    "brand",
    "price",
    "concentration",
    "notes",
    "perfumer",
  ];

  return (
    <Card>
      <CardHeader>{item.name}</CardHeader>
      <ListGroup>
        {item &&
          propertiesToShow.map((key) => (
            <ListGroupItem key={key}>
              <strong>{key}</strong>: {item[key]}
            </ListGroupItem>
          ))}
      </ListGroup>
    </Card>
  );
};

export default ItemContextMenu;
