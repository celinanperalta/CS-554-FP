import React from "react";
import queries from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles, Modal, Box, IconButton } from "@material-ui/core";
import { Comment } from "@material-ui/icons";

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    minWidth: 350,
    height: "auto",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: 5,
    border: "1px solid #1e8678",
    textAlign: "left",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
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
    maxWidth: 300,
    minWidth: 300,
    minHeight: 200,
    maxHeight: 200,
    borderRadius: 5,
    border: "1px solid",
    zIndex: 1300,
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30vh",
    padding: "20px",
  },
  inputFields: {
    marginBottom: "10px",
  },
});

const NewComment = (props) => {
  const [addComment, { data }] = useMutation(queries.ADD_COMMENT, {
    update(cache, { data: { addComment } }) {
        const { getPromptById } = cache.readQuery({
            query: queries.GET_PROMPT,
            variables: {
                promptId: props.promptId
            },
        });
        cache.writeQuery({
            query: queries.GET_PROMPT,
            variables: {
                promptId: props.promptId
            },
            data: { getPromptById: {
                ...getPromptById,
                comments: [...getPromptById.comments, addComment]
            } },
        });
        }
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [comment, setComment] = React.useState("");

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit">Add Comment</button>
          </form>
        </Box>
      </Modal>
      <IconButton
        onClick={() => setOpen(!open)}
        color="default"
        aria-label="comment on prompt"
        component="span"
      >
        <Comment />
      </IconButton>
    </div>
  );
};

export default NewComment;
