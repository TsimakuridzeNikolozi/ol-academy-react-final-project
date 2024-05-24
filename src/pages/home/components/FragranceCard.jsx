import React, { useCallback, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Col,
} from "reactstrap";
import ImageCarousel from "./ImageCarousel";
import { ReactComponent as HeartIcon } from "../../../assets/images/HeartIcon.svg";
import { useLocalStorage } from "usehooks-ts";
import { ReactComponent as CartIcon } from "../../../assets/images/CartIcon.svg";
import { Link } from "react-router-dom";
import { NAVIGATION_ROUTES } from "../../../constants";

const FragranceCard = ({
  fragranceId,
  fragranceName,
  fragranceConcentration,
  brand,
  description,
  imageSources,
  color,
  rating,
  numberOfRatings,
}) => {
  // Hearting functionality
  const [heartedFragrances, setHeartedFragrances] = useLocalStorage(
    "heartedFragrances",
    []
  );
  const fragranceHearted = heartedFragrances.includes(fragranceId);

  const saveHeartedFragrance = useCallback(() => {
    if (!fragranceHearted) {
      setHeartedFragrances((prev) => [...prev, fragranceId]);
    } else {
      setHeartedFragrances((prev) => prev.filter((id) => id !== fragranceId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fragranceHearted, fragranceId]);

  const [hover, setHover] = useState(false);

  const style = {
    boxShadow: hover ? `0px 0px 50px ${color}` : "none",
    transition: "box-shadow 0.3s ease-in-out",
    width: "100%",
    borderRadius: "10px",
    maxWidth: "400px",
  };

  return (
    <Card
      color="light"
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ImageCarousel imageSources={imageSources} />
      <CardBody>
        <Col className="d-flex align-items-center justify-content-between">
          <CardTitle tag="h5">
            {fragranceName} {fragranceConcentration}
          </CardTitle>
          <button
            onClick={() => saveHeartedFragrance()}
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <HeartIcon
              style={{
                width: "20px",
                height: "20px",
                fill: fragranceHearted ? "#D75A4A" : "gray",
                transition: "all 0.3s ease-in-out",
                transform: fragranceHearted ? "scale(1.1)" : "scale(1)",
              }}
            />
          </button>
        </Col>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {brand}
        </CardSubtitle>
        <CardText className="textWithLineClamp">{description}</CardText>
        <Col className="d-flex gap-2">
          <Link to={`${NAVIGATION_ROUTES.item}/${fragranceId}`}>
            <Button color="primary">More</Button>
          </Link>
          <Button color="success">
            <CartIcon style={{ width: "20px", height: "20px" }} />
          </Button>
        </Col>
      </CardBody>
    </Card>
  );
};

export default FragranceCard;
