import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import Prompt from "../components/Prompt";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  grid: {
    flexGrow: 1,
    flexDirection: "row",
    margin: "auto",
    justifyContent: "center",
    maxWidth: '100%'
  },
});

const Prompts = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(queries.GET_PROMPTS, {
    pollInterval: 4000,
  });

  if (loading) {
    return (
      <div className="app">
        <h2>Loading Prompts...</h2>
      </div>
    );
  }
  return (
    <div className="app">
      <h2>Prompts</h2>
      <Grid container className={classes.grid} spacing={5}>
        {data &&
          data.getPrompts.map((item, index) => (<Prompt id={item.id} key={index} />))}
      </Grid>
      <br />
    </div>
  );
};

export default Prompts;
