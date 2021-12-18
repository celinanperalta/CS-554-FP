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
} from "@material-ui/core";
import NewComment from "./NewComment";
import NewSubmission from "./NewSubmission";
import { useQuery } from "@apollo/client";

interface HomeProfileProps {
  user: User;
}

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    minWidth: 350,
    height: "auto",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: 5,
    border: "1px solid #ededed",
    textAlign: "left",
    boxShadow: "0px 10px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
    maxWidth: '100%'
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
  // 'button:hover': {
  //     backgroundColor: '#333',
  //     borderColor: '#333',
  //     boxShadow: 'none',
  //   }
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
    paddingTop: '20px',
    paddingBottom: '5px'
  }
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
  if (loading) return <p></p>;
  if (error) return <p></p>;

  console.log(data.getPromptById, userData.me.id)
  return (
    <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.card} variant="outlined">
        <Link href={`/prompts/${id}`} passHref>
          <CardContent className={classes.content}>
            <Typography className="promptContent">
              {data.getPromptById.prompt}
            </Typography>
            <Typography variant="subtitle2">Closes on: {data.getPromptById.dateCloses.slice(0,10)}</Typography>
          </CardContent>
        </Link>
        {data.getPromptById.posted_by != userData.me.id ?
          (<Grid container>
            <Grid item>
              <NewComment promptId={id} />
            </Grid>
            <Grid item>
              <NewSubmission promptId={id} />
            </Grid>
          </Grid>) : null}
      </Card>
    </Grid>
  );
};

export default Prompt;
