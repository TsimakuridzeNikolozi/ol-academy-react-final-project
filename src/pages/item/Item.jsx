import React, { useMemo } from "react";
import {
  ItemImages,
  InfoPanel,
  CommentsList,
  CommentInputForm,
} from "./components";
import { Col, Container, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import { useDB } from "../../hooks/useDB";

const Item = () => {
  const { itemId } = useParams();
  const { fragranceList } = useDB();
  const currentFragrance = useMemo(() => {
    return fragranceList.find((fragrance) => fragrance.id === itemId);
  }, [itemId, fragranceList]);

  return (
    <Container fluid>
      <Row className="d-flex align-items-start mt-4">
        <Col xs="12" md="6" className="d-flex flex-column gap-3">
          <ItemImages imageSources={currentFragrance?.imageSources ?? []} />
          <div className="d-none d-md-block">
            <CommentInputForm fragranceId={currentFragrance?.id} />
            <CommentsList fragrance={currentFragrance} />
          </div>
        </Col>
        <Col xs="12" md="6">
          <InfoPanel fragrance={currentFragrance} />
        </Col>
      </Row>
      <Row className="d-md-none mt-3">
        <Col xs="12" className="d-flex flex-column gap-2">
          <CommentInputForm fragranceId={currentFragrance?.id} />
          <CommentsList fragrance={currentFragrance} />
        </Col>
      </Row>
    </Container>
  );
};

export default Item;
