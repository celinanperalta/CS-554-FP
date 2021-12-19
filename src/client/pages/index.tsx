import Prompt from "../components/Prompt";
import React, { useState, useEffect } from "react";
import HomeProfile from "../components/HomeProfile";
import queries from "../queries";
import { useQuery } from "@apollo/client";
import useUser from "../lib/useUser";
import AllCommentsFeed from "../components/AllCommentsFeed";
import AllPromptsFeed from "../components/AllPromptsFeed";
import AllSongSubFeed from "../components/AllSongSubFeed";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  mainRow: {
    maxWidth: '100%'
  }
});

export default function Home() {
  const classes = useStyles();
  //const [activePrompts, setActivePrompts] = useState();

  const { data: userData } = useUser({
    redirectTo: "/login",
  });

  let item = {
    id: 12,
    prompt: "songs thats play when you're on your last final",
    posted_by: "User3",
  };

  const {
    data: promptData,
    loading: promptLoading,
    error: promptError,
  } = useQuery(queries.GET_PROMPTS);

  const {
    data: subData,
    loading: subLoading,
    error: subError,
  } = useQuery(queries.GET_SONG_SUBS);

  const {
    data: commentData,
    loading: commentLoading,
    error: commentError,
  } = useQuery(queries.GET_SONG_SUBS);

  if (promptLoading || subLoading) {
    console.log("THERE IS NO DATA PLS HOLD");
    return <p>Loading Homepage</p>;
  }

  if (promptError || subError) {
    console.log("THERE IS AN ERROR PLS HOLD");
    return <p>{promptError && promptError.message},{subError && subError.message}</p>;
  }
  if (
    promptData &&
    subData &&
    promptData.getPrompts &&
    subData.getSongSubmissions
  ) {
    let activePrompts = [];
    let displaySubmissions = [];
    console.log("DATA EXISTS");

    activePrompts = promptData.getPrompts.slice(0, 3); //wrap activePromptcard in bigger compoentn, call this there
    displaySubmissions = subData.getSongSubmissions.slice(0, 2); //wrap songSub in bigger component, call this there

    if (userData && userData.me) {
      return (
        <div className="app">
          <div className={`${classes.row} ${classes.mainRow}`}>
            <div className={classes.column}>
              <HomeProfile id={userData.me.id} />
            </div>
            <div className={classes.column}>
              <AllPromptsFeed/>
            </div>
            <div className={classes.column}>
              <AllSongSubFeed/>
            </div>
            <div className={classes.column}>
              <AllCommentsFeed/>
            </div>
            
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
