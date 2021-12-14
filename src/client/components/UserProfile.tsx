//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, {useState, useEffect}  from "react";
import Link from "next/link";
import Winner from '@material-ui/icons/EmojiEvents';
import Likes from '@material-ui/icons/FavoriteBorder';

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
      minWidth: 250,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      border: '0px',
      textAlign: "center",
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
      height: '50%',
      width: '50%',
      borderRadius: '50%',
      paddingBottom: '10px',
      margin: 'auto'
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
    content: {
        marginBottom: '0px',
        paddingBottom: '0px'
    },
    status: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0px',
        margin: '0px',
        justifyContent: 'center',
        marginTop: '5px'
    },
    values: {
        padding: '0px',
        margin: '0px',
        paddingLeft: '10px',
        paddingRight: '10px'
    }
  });

const UserProfile = (props) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className={classes.card} variant="outlined">
                <CardContent className={classes.content}>
                    <CardMedia
                    component="img"
                    image="https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg"
                    alt="Live from space album cover"
                    className={classes.media}
                    />
                    <Typography className="promptContent" >Kaiqi Chee</Typography>
                </CardContent>
                    <div className={classes.status}>
                        <Winner />
                        <p className={classes.values}>5</p>
                        <Likes />
                        <p className={classes.values}>5</p>
                    </div>
                <br/>                          
            </Card>
        </Grid>
    )
  }

export default UserProfile;