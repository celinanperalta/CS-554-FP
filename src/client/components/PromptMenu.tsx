import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  makeStyles,
  Modal,
  Box,
  IconButton,
  TextField,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from "@material-ui/core";
import { useMutation } from "@apollo/client";
import queries from "../queries";
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
    border: "1px solid #ededed",
    zIndex: 1300,
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30vh",
    padding: "20px",
  },
  inputFields: {
    marginBottom: "10px",
  },
  submitButton: {
    color: "dark grey",
    borderColor: "dark grey",
    marginTop: "25px",
  },
  input: {
    marginBottom: "10px",
  },
  deleteButton: {
    color: "red",
    borderColor: "dark red",
    marginTop: "25px",
  },
  date: {
    marginTop: "10px",
    marginBottom: "2px",
  },
});

const PromptMenu = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const [isClosedValue, setIsClosedValue] = React.useState(props.isClosed);
  const [dateCloses, setDateCloses] = React.useState("");
  const [changePromptDate] = useMutation(queries.UPDATE_PROMPT_DATE);
  const [deletePrompt, { loading, error }] = useMutation(
    queries.DELETE_PROMPT,
    {
      refetchQueries: [{ query: queries.GET_PROMPTS }],
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isClosedValue) {
      await changePromptDate({
        variables: {
          promptId: props.promptId,
          postedBy: props.posted_by,
          isClosed: isClosedValue,
        },
      });
      setDateCloses("");
      setOpen(false);
      return;
    }
    if (dateCloses && new Date(dateCloses) < new Date()) {
      await changePromptDate({
        variables: {
          promptId: props.promptId,
          postedBy: props.posted_by,
          isClosed: true,
          dateCloses,
        },
      });
      setOpen(false);
      return;
    } else {
      if (!dateCloses) {
        alert("Enter in close date");
        return;
      }
      await changePromptDate({
        variables: {
          promptId: props.promptId,
          postedBy: props.posted_by,
          isClosed: isClosedValue,
          dateCloses,
        },
      });
      setOpen(false);
      return;
    }
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deletePrompt({
      variables: {
        id: props.promptId,
      },
    });
    setOpen(false);
  };

  return (
    <div>
      <IconButton aria-label="settings" onClick={() => setOpen(!open)}>
        <MoreVertIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={isClosedValue}
                  onClick={() => setIsClosedValue(!isClosedValue)}
                />
              }
              label="Mark Closed"
            />
          </FormGroup>
          <form onSubmit={handleSubmit}>
            <label>
              <p className={classes.date}>Change Close Date:</p>
              <TextField
                type="datetime-local"
                name="date"
                onChange={(e) => setDateCloses(e.target.value)}
                disabled={isClosedValue}
              />
            </label>
            <Button
              className={classes.submitButton}
              variant="outlined"
              type="submit"
              value="Submit"
            >
              Submit
            </Button>
            <Button
              className={classes.deleteButton}
              variant="outlined"
              onClick={handleDelete}
            >
              Delete Prompt
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default PromptMenu;
