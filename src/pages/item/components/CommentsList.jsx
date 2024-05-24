import React, { useMemo } from "react";
import { ListGroup } from "reactstrap";
import { useDB } from "../../../hooks/useDB";
import Comment from "./Comment";

const CommentsList = ({ fragrance }) => {
  const { commentsList, likesList, dislikesList } = useDB();

  const commentsForCurrentItem = useMemo(() => {
    return commentsList.filter(
      (comment) => comment.fragranceId === fragrance?.id
    );
  }, [commentsList, fragrance]);

  const commentIds = useMemo(() => {
    return new Set(commentsForCurrentItem.map((comment) => comment.id));
  }, [commentsForCurrentItem]);

  const likesByComments = useMemo(() => {
    const reactionByCommentsMap = new Map();
    likesList.forEach((like) => {
      if (commentIds.has(like.commentId)) {
        reactionByCommentsMap.set(like.commentId, [
          ...(reactionByCommentsMap?.get(like.commentId) || []),
          like,
        ]);
      }
    });
  }, [likesList, commentIds]);

  const dislikesByComments = useMemo(() => {
    const reactionByCommentsMap = new Map();
    dislikesList.forEach((dislike) => {
      if (commentIds.has(dislike.commentId)) {
        reactionByCommentsMap.set(dislike.commentId, [
          ...(reactionByCommentsMap?.get(dislike.commentId) || []),
          dislike,
        ]);
      }
    });
  }, [dislikesList, commentIds]);

  if (!commentsList) return null;
  return (
    <ListGroup className="p-2 p-md-4 bg-light">
      {commentsForCurrentItem.map((comment, index) => (
        <Comment
          key={index}
          comment={comment}
          likes={likesByComments?.get(comment.id) ?? []}
          dislikes={dislikesByComments?.get(comment.id) ?? []}
        />
      ))}
    </ListGroup>
  );
};

export default CommentsList;
