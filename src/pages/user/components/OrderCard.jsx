import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const OrderCard = ({ order }) => {
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">Order ID: {order.id}</CardTitle>
        <CardText>Items: {JSON.stringify(order.items)}</CardText>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
