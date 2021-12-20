//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Prompt from "./Prompt";
import NewPrompt from "../components/NewPrompt";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import client from "../apollo-client";
import useUser from "../lib/useUser";

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  Button,
  IconButton,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
    minWidth: 500,
    minHeight: 650,
    maxHeight: 650,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "0px solid",
    justifyContent: "center",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
    overflowY: "scroll",
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
  feedHeader: {
    backgroundColor: "#333",
    padding: "10px",
    margin: "0px",
    color: "white",
    display: "flex",
    flexDirection: "row",
    width: 750,
    borderRadius: 5,
    //justifyContent: 'flex-end'
  },
  promptHeader: {
    margin: "auto",
    marginLeft: "10px",
  },
});

const PromptFeed = (props) => {
  const classes = useStyles();
  const { data } = useUser({
    redirectTo: "/login",
  });

  const user = useQuery(queries.GET_USER, {
    skip: !data,
    variables: {
      id: props.userId
    },
  });

  if(data && user){
  return (
    <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
        <div className={classes.feedHeader}>
          <h2 className={classes.promptHeader}>{data.me.id===props.userId ? "My Prompts" : `${user.data.getUserById.username}'s Prompts`}</h2>
          {(user.data.getUserById.id && data.me.id===props.userId)? <NewPrompt/> : null}
        </div>
        
        {props.prompts.map((prompt) => {
          return <Prompt key={prompt} id={prompt} />;
        })}
    </Grid>
  );}else{
    return <div>Loading...</div>
  }
};


export default PromptFeed;
