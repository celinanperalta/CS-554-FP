//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, {useState, useEffect}  from "react";
import Link from "next/link";
import ActivityFeedCard from "./ActivityFeedCard";

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
      maxWidth: 300,
      minWidth: 300,
      minHeight: 500,
      maxHeight: 500,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 5,
      border: '0px solid',
      justifyContent: 'center',
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
      overflowY: 'scroll',
      //scrollbarWidth: 'none'
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
      color: 'white'
    }
  });

const ActivityFeed = (props) => {
    const classes = useStyles();

    let activity = {action: "new submission", prompt: "songs thats play when you're on your last final"}


    return (
        <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Box className={classes.card}>
                <p className={classes.feedHeader}>Activity Feed</p>
                <ActivityFeedCard data={activity} />
                <ActivityFeedCard data={activity} />
                <ActivityFeedCard data={activity} />
                <ActivityFeedCard data={activity} />
                <ActivityFeedCard data={activity} />
            </Box>
        </Grid>
    )
  }

export default ActivityFeed;