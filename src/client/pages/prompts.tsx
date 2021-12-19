import React from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import Prompt from "../components/Prompt";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  grid: {
    flexGrow: 1,
    flexDirection: "column",
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: '100%',
    width: '100%'
  },
});

const Prompts = () => {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(queries.GET_PROMPTS,{
    fetchPolicy: "no-cache",
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
      <Grid container className={classes.grid} spacing={1} sm={12}>
        {data &&
          data.getPrompts.map((item, index) => (<Prompt id={item.id} key={index} />))}
      </Grid>
      <br />
    </div>
  );
};

export default Prompts;
