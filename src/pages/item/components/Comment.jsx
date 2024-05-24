import React, { useState } from "react";
import { Button, ListGroupItem } from "reactstrap";
import { ReactComponent as LikeIcon } from "../../../assets/images/LikeIcon.svg";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useDB } from "../../../hooks/useDB";

const Comment = ({ comment, likes, dislikes }) => {
  const { currentUser } = useAuthentication();
  const { addLike, addDislike } = useDB();

  const [likedByCurrentUser, setLikedByCurrentUser] = useState(
    likes?.find(
      (reaction) =>
        reaction.userId === currentUser.uid && reaction.type === "like"
    )
  );
  const [dislikedByCurrentUser, setDislikedByCurrentUser] = useState(
    dislikes?.find(
      (reaction) =>
        reaction.userId === currentUser.uid && reaction.type === "dislike"
    )
  );

  const [likesCount, setLikesCount] = useState(comment.likes);

  const [dislikesCount, setDislikesCount] = useState(comment.dislikes);

  const handleLike = async () => {
    addLike(
      currentUser.uid,
      comment.id,
      likedByCurrentUser,
      dislikedByCurrentUser,
      comment.likes,
      comment.dislikes
    );
    setLikesCount(likedByCurrentUser ? likesCount - 1 : likesCount + 1);
    setDislikesCount(dislikedByCurrentUser ? dislikesCount - 1 : dislikesCount);
    setLikedByCurrentUser(!likedByCurrentUser);
    setDislikedByCurrentUser(false);
  };

  const handleDislike = async () => {
    addDislike(
      currentUser.uid,
      comment.id,
      likedByCurrentUser,
      dislikedByCurrentUser,
      comment.likes,
      comment.dislikes
    );
    setLikesCount(likedByCurrentUser ? likesCount - 1 : likesCount);
    setDislikesCount(
      dislikedByCurrentUser ? dislikesCount - 1 : dislikesCount + 1
    );
    setDislikedByCurrentUser(!dislikedByCurrentUser);
    setLikedByCurrentUser(false);
  };

  return (
    <ListGroupItem
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
            disabled={!currentUser}
            outline={!likedByCurrentUser}
            onClick={() => handleLike()}
            className="d-flex align-items-center gap-1"
          >
            <LikeIcon style={{ width: "20px", height: "20px" }} />{" "}
            {comment.likes}
          </Button>
          <Button
            color="danger"
            disabled={!currentUser}
            outline={!dislikedByCurrentUser}
            className="d-flex align-items-center gap-1"
            onClick={() => handleDislike()}
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
  );
};

export default Comment;
