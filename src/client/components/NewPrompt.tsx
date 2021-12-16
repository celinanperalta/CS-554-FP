import React, { useState } from "react";
import { Prompt } from "../model/Prompt";
import queries from "../queries";
import { useMutation } from "@apollo/client";
import useUser from "../lib/useUser";

const NewPromptModal = () => {
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

  return (
    <div>
      {/* <h1>New Prompt</h1> */}
      {open && (
        <form onSubmit={handleSubmit}>
          <label>
            Prompt:
            <input type="text" name="prompt" onChange={(e) => setPrompt(e.target.value)}/>
          </label>
          {/* Date Picker */}
          <label>
            Date:
            <input type="datetime-local" name="date" onChange={(e) => setDateCloses(e.target.value)}/>
          </label>
          {/* Submit Button */}
          <input type="submit" value="Submit" />
        </form>
      )}
      <button onClick={() => setOpen(!open)}>New Prompt</button>
    </div>
  );
};

export default NewPromptModal;
