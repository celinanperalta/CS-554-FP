import React from "react";
import { useMutation } from "@apollo/client";
import queries from "../queries";
import Like from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import Stack from "@mui/material/Stack";
interface LikeSubmissionProps {
  id: string;
  numLikes: number;
  liked: boolean;
}

const LikeSubmission = (props) => {
  const [isLiked, setIsLiked] = React.useState(props.liked);
  const [numLikes, setNumLikes] = React.useState(props.numLikes);
  const [likeSubmission] = useMutation(queries.ADD_SONG_SUB_VOTE, {
    variables: {
      id: props.id,
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

  const [unLikeSubmission] = useMutation(queries.REMOVE_SONG_SUB_VOTE, {
    variables: {
      id: props.id,
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
    if (isLiked) {
      unLikeSubmission();
      setIsLiked(false);
      setNumLikes(numLikes - 1);
    } else {
      likeSubmission();
      setIsLiked(true);
      setNumLikes(numLikes + 1);
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{marginRight: 2}}>
      <IconButton onClick={handleLike} edge="end">
        <Like color={isLiked ? "secondary" : "action"} />
      </IconButton>
      <div>
        <span>{numLikes}</span>
      </div>
    </Stack>
  );
};

export default LikeSubmission;
