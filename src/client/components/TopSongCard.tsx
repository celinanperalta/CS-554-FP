//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Like from "@material-ui/icons/FavoriteBorder";
import Comment from "@material-ui/icons/ChatBubbleOutline";
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
  Box,
} from "@material-ui/core";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles({
  card: {
    width: "450px",
    minWidth: 175,
    height: "auto",
    marginLeft: "10px",
    marginRight: "10px",
    borderRadius: 5,
    border: "0px solid #1e8678",
    textAlign: "left",
    //marginLeft: '10px',
    // marginRight: '10px',
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    
  },
  media: {
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: "#333",
    color: "#FFFFFF",
  },
  button: {
    color: "#04AA6D",
    borderColor: "#04AA6D",
    margin: "10px",
  },
  cmedia: {
    width: "60px",
    height: "auto",
  },
  songInfo: {
    display: "flex",
    flexDirection: "column",
  },
  songTitle: {
    fontWeight: "bold",
  },
});

const TopSongCard = (props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(queries.GET_TOP_SONG, {
    variables: { promptId: props.promptId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data.getTopSong) return <p>No Top Song</p>;
  return (
    // <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.card} variant="outlined">
        <UserAvatar userId={data.getTopSong.submitted_by} />
        <CardContent className="">
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs="auto">
              <CardMedia
                component="img"
                image={data.getTopSong.song.imageUrl}
                alt={data.getTopSong.song.title}
                className={classes.cmedia}
              />
            </Grid>
            <Grid item xs={8} >
              <div className={classes.songInfo}>
                <Typography className={classes.songTitle}>
                  {data.getTopSong.song.name}
                </Typography>
                <Typography variant="caption">
                  {data.getTopSong.song.artist}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    // </Grid>
  );
};

export default TopSongCard;
