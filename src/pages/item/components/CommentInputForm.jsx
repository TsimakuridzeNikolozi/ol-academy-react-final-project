import React, { useState } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useDB } from "../../../hooks/useDB";

const CommentInputForm = ({ fragranceId }) => {
  const { currentUser } = useAuthentication();
  const { addComment } = useDB();

  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newComment = {
      comment: comment,
      user: {
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      fragranceId,
      likes: 0,
      dislikes: 0,
    };
    await addComment(newComment);
    setComment("");
  };

  return (
    currentUser && (
      <Form onSubmit={handleSubmit}>
        <FormGroup className="w-100 d-flex flex-column gap-2">
          <div className="d-flex align-items-start gap-2">
            <img
              src={currentUser?.photoURL}
              alt={currentUser?.displayName ?? "User"}
              width="40"
              height="40"
              style={{ borderRadius: "100%" }}
            />
            <Input
              type="textarea"
              placeholder="Leave a review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              disabled={comment.length === 0}
              type="submit"
              color="primary"
            >
              Comment
            </Button>
          </div>
        </FormGroup>
      </Form>
    )
  );
};

export default CommentInputForm;
