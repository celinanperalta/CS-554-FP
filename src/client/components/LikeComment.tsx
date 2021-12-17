import React from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries";
import Like from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@material-ui/core";

const LikeComment = (props) => {

  const [likeComment] = useMutation(queries.ADD_COMMENT_LIKE, {
    variables: {
      commentId: props.id,
    },
    refetchQueries: [
        {
            query: queries.GET_SONG_SUB,
            variables: {
                id: props.id,
            },
        },
    ],
  });

  const handleLike = () => {
    console.log("like comment")
    likeComment();
  };

  return (
    <IconButton onClick={handleLike}>
      <Like />
    </IconButton>
  );
};

export default LikeComment;
