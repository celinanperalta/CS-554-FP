import React from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries";
import Like from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@material-ui/core";

const LikeSubmission = ({ submission }) => {

  const [likeSubmission] = useMutation(queries.ADD_SONG_SUB_VOTE, {
    variables: {
      id: submission.id,
    },
    refetchQueries: [
        {
            query: queries.GET_SONG_SUB,
            variables: {
                id: submission.id,
            },
        },
    ],
  });

  const handleLike = () => {
    console.log("like")
    likeSubmission();
  };

  return (
    <IconButton onClick={handleLike}>
      <Like />
    </IconButton>
  );
};

export default LikeSubmission;
