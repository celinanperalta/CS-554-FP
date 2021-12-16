//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, {useState, useEffect}  from "react";
import Link from "next/link";
import Like from '@material-ui/icons/FavoriteBorder';
import Comment from '@material-ui/icons/ChatBubbleOutline';
import Play from '@material-ui/icons/PlayCircleOutline';
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
      maxWidth: 350,
      minWidth: 350,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '10px',
      marginBottom: '10px',
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
    },
    subheader: {
      color: 'white'
    },
    button: {
      color: '#04AA6D',
      borderColor: '#04AA6D',
      margin: "10px"
    },
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

const SubmissionDisplay = (props) => {
    const classes = useStyles();
    //const [song, setSong] = useState(undefined);

    const getPrompt = (id) => {
        let {loading, error, data} = useQuery(queries.GET_PROMPT, { variables: {promptId: id}, pollInterval: 4000 })
        if (data) {
          return data.getPromptById.prompt;
        }
        else {
          return "BeepBop";
        }
      }
    //console.log(getPrompt('669ca201-88bf-486c-a2c8-b53d56ee50c1'));
 

    return (
        // <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card className={classes.card} variant="outlined">
             <Link href={`/prompts/${props.data.prompt_id}`}>
                <CardHeader className={classes.header} subheader={<Typography className={classes.subheader}> {getPrompt(props.data.prompt_id)} </Typography>} />
              </Link>
        <CardContent className="content" >

        <Box className={classes.box}>
            <CardMedia
            component="img"
            image={props.data.song.imageUrl}
            alt="Live from space album cover"
            className={classes.cmedia}
            />
        <div className={classes.songInfo}>
          <Typography className={classes.songTitle}  variant="h6">{props.data.song.name}</Typography>
          <Typography variant="caption" >{props.data.song.artist}</Typography>
          </div>
          <IconButton aria-label="play/pause">
            <Play  fontSize="large" />
          </IconButton>
          </Box>
        </CardContent>
    </Card>

        // </Grid>
    )
  }

export default SubmissionDisplay;