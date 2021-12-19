//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SongSubmission from "../components/SongSubmission";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import User from "./User"
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
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '0px solid',
        justifyContent: 'center',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
        overflow: 'scroll'
    },
    commentCard: {
        maxWidth: 450,
        minWidth: 450,
        height: "auto",
        margin: "10px",
        borderRadius: 5,
        border: "1px solid",
        textAlign: "left",
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
    },
    player: {
        border: "1px solid #333",
        borderRadius: 5,
        marginBottom: "5px",
      },
      content: {
        padding: "0px",
      },
      status: {
        display: "flex",
        flexDirection: "row",
        padding: "0px",
        margin: "0px",
        justifyContent: "right",
        marginTop: "5px",
      },
});

const AllSongSubFeed = () => {
    const classes = useStyles();
    const { loading, error, data } = useQuery(queries.GET_SONG_SUBS, { pollInterval: 1000 });

    return (
        <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Box className={classes.card}>
                <p className={classes.feedHeader}>All Song Submissions</p>
                {data && data.getSongSubmissions.slice(0).reverse().map((songSub) => {
                    return <Card className={classes.card} variant="outlined">
                    <iframe
                      className={classes.player}
                      src={`https://open.spotify.com/embed/track/${songSub.song.id}?utm_source=generator`}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    ></iframe>
                    <CardContent className={classes.content}>
                      <Typography>
                        {songSub.song.name} by{" "}
                        {songSub.song.artist}
                      </Typography>
                    </CardContent>
                    <Link href={`/prompts/${songSub.prompt_id}`}>
                        <a style={{color:"green"}}>Go To Prompt</a>
                        </Link>
                  </Card>
                })}
            </Box>
        </Grid>
    )
}

export default AllSongSubFeed;