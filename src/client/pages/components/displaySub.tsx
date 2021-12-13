//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, {useState, useEffect}  from "react";
import Link from "next/link";
import Like from '@material-ui/icons/FavoriteBorder';
import Comment from '@material-ui/icons/ChatBubbleOutline';
import Play from '@material-ui/icons/PlayCircleOutline';

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
    card1: {
        display: 'flex'
    },
    box: {
        display: 'flex',
        flexDirection: 'row',  
    },
    content: {
        flex: '1 0 auto'
    },
    cmedia: {
        width: '25%',
        height: '25%',
        margin: 'auto',
        padding: 'auto'
    },
    songInfo: {
        display: 'flex',
        flexDirection: 'column',  
        paddingLeft: "20px",
        paddingRight: "10px",
    },
    songTitle: {
        fontWeight: 'bold'
    }
  });

const DisplaySub = (props) => {
    const classes = useStyles();
    const [song, setSong] = useState(undefined);

    return (
        // <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className={classes.card} variant="outlined">
             <Link href={`/prompts/${props.data.id}`}>
                    <CardHeader className={classes.header} subheader={props.data.prompt} />
                </Link>
        <CardContent className="content" >

        <Box className={classes.box}>
            <CardMedia
            component="img"
            image="https://i.mdel.net/i/db/2019/12/1255378/1255378-800w.jpg"
            alt="Live from space album cover"
            className={classes.cmedia}
            />
        <div className={classes.songInfo}>
          <Typography className={classes.songTitle}  variant="h7">Live From Space</Typography>
          <Typography variant="caption" color="text.secondary">Mac Miller</Typography>
          </div>
          <IconButton aria-label="play/pause">
            <Play />
          </IconButton>
          </Box>
        </CardContent>
    </Card>

        // </Grid>
    )
  }

export default DisplaySub;