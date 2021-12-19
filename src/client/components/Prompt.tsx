//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, { useState } from "react";
import Link from "next/link";
import Like from "@material-ui/icons/FavoriteBorder";
import queries from "../queries";
import useUser from "../lib/useUser";
import Image from "next/image";
import PromptMenu from "./PromptMenu";
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
  Avatar,
  Collapse,
} from "@material-ui/core";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import NewComment from "./NewComment";
import NewSubmission from "./NewSubmission";
import { useQuery } from "@apollo/client";
import TopSongCard from "./TopSongCard";
import Comment from "./Comment";
import SubmissionFeed from "./SubmissionFeed";
import { Comment as CommentIcon } from "@material-ui/icons";

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
  },
  titleHead: {
    fontWeight: "bold",
    marginBottom: "10px",
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
    paddingBottom: "20px",
    alignItems: "center",
    margin: "auto",
    textAlign: "center",
  },
});

const Prompt = ({ id }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { data: userData } = useUser({
    redirectTo: "/login",
  });

  let { loading, error, data } = useQuery(queries.GET_PROMPT, {
    variables: { promptId: id },
    pollInterval: 4000,
    fetchPolicy: "network-only",
  });

  let {
    loading: userLoading,
    error: userError,
    data: userData2,
  } = useQuery(queries.GET_USER, {
    skip: !data,
    variables: { id: data?.getPromptById.posted_by },
  });

  //took out the statements so it doesn't appear on the page
  if (loading || !data) return <p></p>;
  if (error) return <p></p>;

  return (
    <Grid item className={classes.grid}>
      <Card className={classes.card} variant="outlined">
        <CardHeader
          avatar={
            <Avatar>
              <Image
                src={
                  userData2?.getUserById.profile_picture ||
                  "/public/userDefault.jpeg"
                }
                alt="profile"
                className={classes.media}
                width={70}
                height={70}
              />
            </Avatar>
          }
          title={<Typography>{userData2?.getUserById.username}</Typography>}
          subheader={
            <Typography>
              {`Open until: ${data.getPromptById.dateCloses.slice(0, 10)}`}
            </Typography>
          }
          action={
            <PromptMenu promptId={data.getPromptById.id} isClosed={data.getPromptById.isClosed} dateCloses={data.getPromptById.dateCloses} posted_by={data.getPromptById.posted_by}/>
          }
        />
        <CardContent>
          <Grid
            container
            justifyContent="center"
            direction="column"
            alignItems="center"
          >
            <Link href={`/prompts/${id}`} passHref>
              <Typography
                variant="h5"
                component="h1"
                className={classes.titleHead}
              >
                {data.getPromptById.prompt}
              </Typography>
            </Link>

            {data.getPromptById.isClosed ? (
              <TopSongCard promptId={id} />
            ) : (
              <div>
                <SubmissionFeed
                  promptId={id}
                  songs={data.getPromptById.submittedSongs}
                />
              </div>
            )}
          </Grid>
        </CardContent>
        {data.getPromptById.posted_by !== userData?.me?.id ? (
          <CardActions disableSpacing>
            <IconButton
              onClick={() => setExpanded(!expanded)}
              color="default"
              aria-label="comment on prompt"
              component="span"
            >
              <CommentIcon />
            </IconButton>
            {!data.getPromptById.isClosed && <NewSubmission promptId={id} />}
          </CardActions>
        ) : null}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <NewComment promptId={id} />
            <Stack
              direction="column"
              divider={<Divider orientation="horizontal" flexItem />}
              spacing={0}
            >
              {data.getPromptById.comments.map((commentId) => {
                return <Comment key={commentId} id={commentId} promptId={id} />;
              })}
            </Stack>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};
export default Prompt;
