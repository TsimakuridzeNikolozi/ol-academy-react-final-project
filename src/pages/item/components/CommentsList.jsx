import React from "react";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { ReactComponent as LikeIcon } from "../../../assets/images/LikeIcon.svg";
import { useDB } from "../../../hooks/useDB";

const CommentsList = ({ fragrance }) => {
  const { commentsList } = useDB();

  const commentsForCurrentItem = commentsList.filter(
    (comment) => comment.fragranceId === fragrance?.id
  );
  if (!commentsList) return null;
  return (
    <ListGroup className="p-2 p-md-4 bg-light">
      {commentsForCurrentItem.map((comment, index) => (
        <ListGroupItem
          key={index}
          className="d-flex flex-column gap-3 p-2"
          style={{ border: "1px solid #000" }}
        >
          <div className="d-flex align-items-center flex-wrap gap-3">
            <div className="d-flex align-items-center gap-1">
              <img
                src={comment.user.photoURL}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                }}
                alt="user"
              />
              <strong className="whitespace-nowraps">
                {comment.user.displayName}
              </strong>
            </div>

            <div className="d-flex align-items-center gap-1">
              <Button
                color="success"
                outline
                onClick={() => {}}
                className="d-flex align-items-center gap-1"
              >
                <LikeIcon style={{ width: "20px", height: "20px" }} />{" "}
                {comment.likes}
              </Button>
              <Button
                color="danger"
                outline
                className="d-flex align-items-center gap-1"
                onClick={() => {}}
              >
                <LikeIcon
                  style={{ width: "20px", height: "20px", rotate: "180deg" }}
                />{" "}
                {comment.dislikes}
              </Button>
            </div>
          </div>
          <p>{comment.comment}</p>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CommentsList;
