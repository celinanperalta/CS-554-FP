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
    IconButton,
    Box
  } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
      maxWidth: 200,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 5,
      border: '1px solid #1e8678',
      textAlign: "left",
      marginLeft: '10px',
      marginRight: '10px',
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
        color: "#FFFFFF"
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
    cmedia: {
      width: '60%',
      height: '60%',
      paddingBottom: '5px'
    },
    songInfo: {
      display: 'flex',
      flexDirection: 'column',  
  },
  songTitle: {
    fontWeight: 'bold'
  }
  });

const TopSongCard = (props) => {
    const classes = useStyles();
    const [song, setSong] = useState(undefined);

    return (
        <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card className={classes.card} variant="outlined">
            <CardContent className="">
            <CardMedia
            component="img"
            image="https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg"
            alt="Live from space album cover"
            className={classes.cmedia}
            />
          <div className={classes.songInfo}>
          <Typography className={classes.songTitle}  variant="h6">Live From Space</Typography>
          <Typography variant="caption" >Mac Miller</Typography>
          </div>
          </CardContent>                    
          </Card>
        </Grid>
    )
  }

export default TopSongCard;