import React from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries";
import Like from "@material-ui/icons/FavoriteBorder";
import { IconButton } from "@material-ui/core";

const UnLikeSubmission = ({ submission }) => {

  const [unLikeSubmission] = useMutation(queries.REMOVE_SONG_SUB_VOTE, {
    variables: {
      submissionId: submission.id,
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
    console.log("unlike");
    unLikeSubmission();
  };

  return (
    <IconButton onClick={handleLike}>
      <Like style={{fill:"red"}}/>
    </IconButton>
  );
};

export default UnLikeSubmission;
