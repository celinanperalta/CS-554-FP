import React, { useState } from "react";
import { Prompt } from "../model/Prompt";
import queries from "../queries";
import { useMutation } from "@apollo/client";
import useUser from "../lib/useUser";
import { makeStyles, Modal, Box, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  modalBox: {
    maxWidth: 300,
    minWidth: 300,
    minHeight: 225,
    maxHeight: 225,
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
  button: {
    color: "white",
    borderColor: "white",
  },
  submitButton: {
    color: "dark grey",
    borderColor: "dark grey",
    marginTop: "25px",
  },
  input: {
    margin: "0px",
  },
  date: {
    marginTop: "10px",
    marginBottom: "2px",
  },
});

const NewPrompt = () => {
  const classes = useStyles();

  const [prompt, setPrompt] = useState("");
  const [dateCloses, setDateCloses] = useState("");
  const [timeCloses, setTimeCloses] = useState("");
  const [open, setOpen] = useState(false);

  const [addPrompt, { loading, error }] = useMutation<{ addPrompt: Prompt }>(
    queries.ADD_PROMPT,
    {
      variables: {
        prompt: null,
        dateCloses: null,
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(dateCloses);
    await addPrompt({
      variables: {
        prompt: prompt,
        dateCloses: dateCloses,
      },
    });
    setPrompt("");
    setDateCloses("");
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // check if date is later than today
    const date = new Date(e.target.value);
    const today = new Date();
    if (date < today) {
      setDateCloses(today);
    } else {
      setDateCloses(e.target.value);
    }
  };

  return (
    <div>
      {/* <h1>New Prompt</h1> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <form onSubmit={handleSubmit}>
            <label className={classes.inputFields}>
              <p className={classes.input}>Prompt:</p>
              <TextField
                type="text"
                name="prompt"
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </label>
            {/* Date Picker */}
            <br />
            <label>
              <p className={classes.date}>Open Until:</p>
              <TextField
                type="datetime-local"
                name="date"
                value={dateCloses}
                ref={(input) => input && input.focus()}
                onChange={handleDateChange}
                required
              />
            </label>
            {/* Submit Button */}
            <Button
              className={classes.submitButton}
              variant="outlined"
              type="submit"
              value="Submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={() => setOpen(!open)}
      >
        New Prompt
      </Button>
    </div>
  );
};

export default NewPrompt;
