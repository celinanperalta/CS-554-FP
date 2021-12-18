//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, { useState } from "react";
import Link from "next/link";
import Like from "@material-ui/icons/FavoriteBorder";
import queries from "../queries";
import useUser from "../lib/useUser";

import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  IconButton,
  CardActions,
  CardHeader,
  Box,
} from "@material-ui/core";
import NewComment from "./NewComment";
import NewSubmission from "./NewSubmission";
import { useQuery } from "@apollo/client";
import TopSongCard from "./TopSongCard";

const useStyles = makeStyles({
  card: {
    minWidth: 350,
    height: "auto",
    width: 750,
    margin: "auto",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: 5,
    border: "1px solid #ededed",
    textAlign: "left",
    boxShadow: "0px 10px 12px rgba(0,0,0,0.22);",
    padding: "10px",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
    maxWidth: "100%",
    width: "1000px",
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

  modalBox: {
    maxWidth: 300,
    minWidth: 300,
    minHeight: 200,
    maxHeight: 200,
    borderRadius: 5,
    border: "1px solid",
    zIndex: 1300,
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30vh",
    padding: "20px",
  },
  inputFields: {
    marginBottom: "10px",
  },
  content: {
    paddingTop: "20px",
    paddingBottom: "5px",
  },
});

const Prompt = ({ id }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const handleClose = () => setOpen(false);

  let { loading, error, data } = useQuery(queries.GET_PROMPT, {
    variables: { promptId: id },
    pollInterval: 4000,
    fetchPolicy: "network-only",
  });

  const { data: userData } = useUser({
    redirectTo: "/login",
  });

  //took out the statements so it doesn't appear on the page
  if (loading || !data) return <p></p>;
  if (error) return <p></p>;

  return (
    <Grid item className={classes.grid}>
      <Card className={classes.card} variant="outlined">
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={4}>
            <CardHeader
              title={
                <Link href={`/prompts/${id}`} passHref>
                  <Typography variant="h5" component="h1">
                    {data.getPromptById.prompt}
                  </Typography>
                </Link>
              }
              subheader={
                <Typography variant="h6" component="h6">
                  {`Open until: ${data.getPromptById.dateCloses.slice(0, 10)}`}
                </Typography>
              }
            />
            {data.getPromptById.posted_by !== userData?.me.id ? (
              <CardActions disableSpacing>
                <NewComment promptId={id} />
                <NewSubmission promptId={id} />
              </CardActions>
            ) : null}
          </Grid>
          <Grid item xs={8}>
            <CardContent className={classes.content}>
              <TopSongCard promptId={id} />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};
export default Prompt;
