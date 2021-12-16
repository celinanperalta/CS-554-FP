import React, { useState } from "react";
import { Prompt } from "../model/Prompt";
import queries from "../queries";
import { useMutation } from "@apollo/client";
import useUser from "../lib/useUser";
import { makeStyles, Modal, Box, Button } from '@material-ui/core';

const useStyles = makeStyles({
  modalBox:{
    maxWidth: 300,
    minWidth: 300,
    minHeight: 200,
    maxHeight: 200,
    borderRadius: 5,
    border: '1px solid',
    zIndex: 1300,
    backgroundColor: 'white',
    margin: 'auto',
    marginTop: '30vh',
    padding: '20px'
  },
  inputFields: {
    marginBottom: '10px'
  },
  button: {
    color: 'white',
    borderColor: 'white'
  }
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
    console.log(dateCloses)
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


  return (
    <div>
      {/* <h1>New Prompt</h1> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox} >
          <form onSubmit={handleSubmit}>
            <label className={classes.inputFields}>
              Prompt:
              <input type="text" name="prompt" onChange={(e) => setPrompt(e.target.value)}/>
            </label>
            {/* Date Picker */}
            <br />
            <label>
              Date:
              <input type="datetime-local" name="date" onChange={(e) => setDateCloses(e.target.value)}/>
            </label>
            {/* Submit Button */}
            <input type="submit" value="Submit" />
          </form>
        </Box>
      </Modal>
      {/* {open && (
        <form onSubmit={handleSubmit}>
          <label>
            Prompt:
            <input type="text" name="prompt" onChange={(e) => setPrompt(e.target.value)}/>
          </label> */}
          {/* Date Picker */}
          {/* <label>
            Date:
            <input type="datetime-local" name="date" onChange={(e) => setDateCloses(e.target.value)}/>
          </label> */}
          {/* Submit Button */}
          {/* <input type="submit" value="Submit" />
        </form>
      )} */}
      <Button variant="outlined" className={classes.button} onClick={() => setOpen(!open)}>New Prompt</Button>
    </div>
  );
};

export default NewPrompt;
