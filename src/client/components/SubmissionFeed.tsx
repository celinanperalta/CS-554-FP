//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SongSubmission from "../components/SongSubmission";
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
import Stack from "@mui/material/Stack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
    justifyContent: "center",
    overflow: "scroll",
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
  },
});

const SubmissionFeed = (props) => {
  const classes = useStyles();
  const [current, setCurrent] = React.useState(0);
  const items = props.songs.map((songSub) => {
    return <SongSubmission key={songSub} songSubId={songSub} />;
  });
  const numItems: number = props.songs.length;

  return (
    <div>
      <Box
        justifyContent="space-between"
        alignItems="center"
        display="flex"
        flexDirection="row"
      >
        {numItems > 1 && <IconButton
          onClick={() => {
            setCurrent((current - 1) % numItems);
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        }
        {items[current]}
        {numItems > 1 && 
        <IconButton
          onClick={() => {
            setCurrent((current + 1) % numItems);
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>}
      </Box>
    </div>
  );
};

export default SubmissionFeed;
