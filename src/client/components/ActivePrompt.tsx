//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, {useState, useEffect}  from "react";
import Link from "next/link";
import Like from '@material-ui/icons/FavoriteBorder';
import Comment from '@material-ui/icons/ChatBubbleOutline';

import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
    CardHeader,
    Button,
    IconButton
  } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
      maxWidth: 250,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 5,
      border: '1px solid #1e8678',
      textAlign: "left",
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
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
    // 'button:hover': {
    //     backgroundColor: '#333',
    //     borderColor: '#333',
    //     boxShadow: 'none',
    //   }
  });

const ActivePrompt = (props) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className={classes.card} variant="outlined">
                <Link href={`/prompts/${props.data.id}`}>
                <CardContent>
                    <Typography className="promptContent" >{props.data.prompt}</Typography>
                </CardContent>
                </Link>
                <IconButton color="default" aria-label="like prompt" component="span">
                    <Like />
                </IconButton>
                <IconButton color="default" aria-label="comment on prompt" component="span">
                    <Comment />
                </IconButton>
                <br/>                          
            </Card>
        </Grid>
    )
  }

export default ActivePrompt;