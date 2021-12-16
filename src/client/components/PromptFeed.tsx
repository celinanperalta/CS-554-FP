//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, {useState, useEffect}  from "react";
import Link from "next/link";
import ActivePrompt from "../components/ActivePrompt";
import NewPrompt from "../components/NewPrompt";
import { useQuery } from "@apollo/client";
import queries from "../queries";

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
    Box
  } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
      maxWidth: 500,
      minWidth: 500,
      minHeight: 650,
      maxHeight: 650,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 5,
      border: '0px solid',
      justifyContent: 'center',
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
      overflow: 'scroll'
    },
    titleHead: {
      borderBottom: '1px solid #1e8678',
      fontWeight: 'bold'
    },
    grid: {
      flexGrow: 1,
      flexDirection: 'row'
    },
    media: {
      height: '100%',
      width: '100%'
    },
    header: {
        backgroundColor: '#333',
        //color: 'white'
    },
    button: {
      color: '#04AA6D',
      borderColor: '#04AA6D',
      margin: "10px"
    },
    feedHeader: {
      backgroundColor: '#333',
      padding: '10px',
      margin: '0px',
      color: 'white',
      display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'flex-end'

    },
    promptHeader: {
        margin: 'auto',
        marginLeft: '10px'
    }
  });

const PromptFeed = (props) => {
    const classes = useStyles();
    console.log("prompt feed: ", props.prompts)
    const getPrompt = (id) => {
      let {loading, error, data} = useQuery(queries.GET_PROMPT, { variables: {promptId: id}, pollInterval: 4000 })
      if (data) {
        return data.getPromptById;
      }
      else {
        return "BeepBop";
      }
    }
    return (
        <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Box className={classes.card}>
                <div className={classes.feedHeader}>
                <h2 className={classes.promptHeader}>My Prompts</h2>
                <NewPrompt />
                </div>
                {props.prompts.map((prompt)=>{return <ActivePrompt data={getPrompt(prompt)}/>})}
            </Box>
        </Grid>
    )
  }

export default PromptFeed;