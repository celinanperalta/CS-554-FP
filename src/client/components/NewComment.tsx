import React from "react";
import queries from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import {
  makeStyles,
  Modal,
  Box,
  IconButton,
  TextField,
  Button,
} from "@material-ui/core";
import { Comment } from "@material-ui/icons";

const useStyles = makeStyles({
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: "#333",
    //color: 'white'
  },
  button: {
    color: "#04AA6D",
    borderColor: "#04AA6D",
    margin: "10px",
  },
  modalBox: {
    width: "100%",
    zIndex: 1300,
    backgroundColor: "white",
    margin: "auto",
    padding: "5px",
  },
  inputFields: {
    marginBottom: "10px",
  },
  submitButton: {
    color: "dark grey",
    borderColor: "dark grey",
  },
  input: {
  },
});

const NewComment = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [comment, setComment] = React.useState("");
  
  const [addComment, { data }] = useMutation(queries.ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
      const { getPromptById } = cache.readQuery({
        query: queries.GET_PROMPT,
        variables: {
          promptId: props.promptId,
        },
      });
      cache.writeQuery({
        query: queries.GET_COMMENT,
        variables: {
          commentId: addComment.id,
        },
        data: {
          getCommentById: addComment,
        },
      });
      cache.writeQuery({
        query: queries.GET_PROMPT,
        variables: {
          promptId: props.promptId,
        },
        data: {
          getPromptById: {
            ...getPromptById,
            comments: [...getPromptById.comments, addComment],
          },
        },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({
      variables: {
        promptId: props.promptId,
        comment,
      },
    });
    setComment("");
    setOpen(false);
  };

  return (
    <div>
        <Box className={classes.modalBox}>
          <form onSubmit={handleSubmit}>
            <TextField
            label="Comment"
              type="text"
              size="small"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
            />
          </form>
        </Box>

    </div>
  );
};

export default NewComment;
