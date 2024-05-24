import React, { useMemo } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { useDB } from "../../../hooks/useDB";

const OrderCard = ({ order }) => {
  const { fragranceList } = useDB();
  const fragrancesById = useMemo(() => {
    const fragrancesByIdMap = new Map();
    fragranceList.forEach((fragrance) => {
      fragrancesByIdMap.set(fragrance.id, fragrance);
    });

    return fragrancesByIdMap;
  }, [fragranceList]);

  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle tag="h5">Order ID: {order.id}</CardTitle>
        {order.items
          .map((item) => {
            const fragrance = fragrancesById.get(item.id);
            if (!fragrance) return null;
            return (
              <CardBody
                className="d-flex gap-3 flex-wrap align-items-center"
                key={item.id}
              >
                <img
                  src={fragrance.imageSources?.at(0)}
                  alt={fragrance.name}
                  style={{ width: "180px", height: "180px" }}
                />
                <CardText>
                  {fragrance.brand} {fragrance.name} {fragrance.concentration} x{" "}
                  {item.quantity}
                </CardText>
              </CardBody>
            );
          })
          .filter((item) => item)}
      </CardBody>
    </Card>
  );
};

export default OrderCard;
