import React, {  } from "react";
import Prompt from "../components/Prompt";
import DisplaySubmission from "../components/SubmissionDisplay";
import TopSong from "../components/TopSongCard";
import HomeProfile from "../components/HomeProfile";
import ActivityFeed from "../components/ActivityFeed";
import queries from "../queries";
import { useQuery } from "@apollo/client";
import useUser from "../lib/useUser";

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
              <HomeProfile user={userData.me} />
              <ActivityFeed />
            </div>
            <div className={classes.column}>
              <div className={classes.row}>
                <TopSong data={item} />
                <TopSong data={item} />
                <TopSong data={item} />
                <TopSong data={item} />
              </div>
              <div className={classes.row}>
                <div className={classes.column}>
                  {activePrompts &&
                    activePrompts.map((prompt, i) => {
                      return <Prompt id={prompt} key={i} />;
                    })}
                </div>
                <div className={classes.column}>
                  {displaySubmissions &&
                    displaySubmissions.map((sub, i) => {
                      return <DisplaySubmission data={sub} key={i} />;
                    })}
                  {/* <DisplaySubmission data={item}/>
                <DisplaySubmission data={item}/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
