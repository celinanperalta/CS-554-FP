import React from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries";
import Like from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";

const LikeComment = (props) => {
  const [isLiked, setIsLiked] = React.useState(props.liked);
  const [numLikes, setNumLikes] = React.useState(props.numLikes);
  const [likeComment] = useMutation(queries.ADD_COMMENT_LIKE, {
    variables: {
      id: props.id,
    },
    update: (cache, { data: { likeComment } }) => {
      const { getCommentById } = cache.readQuery({
        query: queries.GET_COMMENT,
        variables: { id: props.id },
      });
      cache.writeQuery({
        query: queries.GET_COMMENT,
        variables: { id: props.id },
        data: {
          getCommentById: { ...getCommentById, likes: likeComment.likes },
        },
      });
    },
  });

  const [unLikeComment] = useMutation(queries.REMOVE_COMMENT_LIKE, {
    variables: {
      id: props.id,
    },
    update: (cache, { data: { unLikeComment } }) => {
      const { getCommentById } = cache.readQuery({
        query: queries.GET_COMMENT,
        variables: { id: props.id },
      });
      cache.writeQuery({
        query: queries.GET_COMMENT,
        variables: { id: props.id },
        data: {
          getCommentById: { ...getCommentById, likes: unLikeComment.likes },
        },
      });
    },
  });

  const handleLike = () => {
    if (isLiked) {
      unLikeComment();
      setIsLiked(false);
      setNumLikes(numLikes - 1);
    } else {
      likeComment();
      setIsLiked(true);
      setNumLikes(numLikes + 1);
    }
  };

  return (
    <div>
      <IconButton onClick={handleLike}>
        <Like color={isLiked ? "secondary" : "action"} />
      </IconButton>
      <span>{numLikes}</span>
    </div>
  );
};

export default LikeComment;
