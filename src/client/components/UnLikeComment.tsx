import React from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries";
import Like from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@material-ui/core";

const UnLikeComment = (props) => {

  const [unLikeComment] = useMutation(queries.REMOVE_COMMENT_LIKE, {
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
    unLikeComment();
  };

  return (
    <IconButton onClick={handleLike}>
      <Like style={{fill:"red"}}/>
    </IconButton>
  );
};

export default UnLikeComment;
