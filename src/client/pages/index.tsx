import React, {useState, useEffect}  from "react";
import Link from "next/link";
import NavBar from '../components/NavBar';
import ActivePrompt from '../components/ActivePrompt';
import DisplaySubmission from '../components/SubmissionDisplay';
import TopSong from '../components/TopSongCard';
import Profile from '../components/HomeProfile';
import ActivityFeed from '../components/ActivityFeed';
import queries from "../queries";
import { useQuery } from "@apollo/client";
import useUser from "../lib/useUser";


import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  row: {
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }

});

export default function Home() {
  const classes = useStyles();
  //const [activePrompts, setActivePrompts] = useState();

  let item = {id: 12, prompt: "songs thats play when you're on your last final", posted_by: "User3"}
  const allPrompts = useQuery(queries.GET_PROMPTS);
  const allSongSubs = useQuery(queries.GET_SONG_SUBS);

  if (allPrompts.loading || allSongSubs.loading){
    console.log("THERE IS NO DATA PLS HOLD")
    return <p>Loading Homepage</p>
  }
  if (allPrompts.data && allPrompts.data.getPrompts && allSongSubs.data && allSongSubs.data.getSongSubmissions) {
    let activePrompts = [];
    let displaySubmissions = [];
    console.log("DATA EXISTS");
  //console.log(allPrompts.data.getPrompts);
  // console.log("----------")
  console.log(allPrompts.loading)
  // console.log(allPrompts.data.getPrompts)
  // console.log(allSongSubs.data.getSongSubmissions);
  // console.log("----------")

  activePrompts = allPrompts.data.getPrompts.slice(0,3);
  displaySubmissions = allSongSubs.data.getSongSubmissions.slice(0,2);

 // let {loading, error, data} = useQuery(queries.GET_SONG_SUBS);
  console.log(activePrompts, displaySubmissions);
  // const getPrompt = (id) => {
  //   let prompt = useQuery(queries.GET_PROMPT, { variables: {promptId: id}, pollInterval: 4000 })
  //   return prompt.data.getPromptById.prompt;
  // }

  //console.log(getPrompt('669ca201-88bf-486c-a2c8-b53d56ee50c1'));
  // useEffect(() => {
  //   //console.log(data.getPrompts);
  //  // setActivePrompts(data.getPrompts.slice(0,2));
  // }, []);
 
  //console.log(activePrompts);
  //prompt={getPrompt(sub.prompt_id)}

  const { data } = useUser({
    redirectTo: "/login",
  });

  const user = useQuery(queries.GET_USER, {
    skip: !data,
    variables: {
      id: data && data.me && data.me.id,
    },
  });

  if (data && user.data) {
  return (
    <div className= "app">
      <div className={classes.row}>
          <div className={classes.column}>
            <Profile user={user.data.getUserById} />
            <ActivityFeed />
          </div>
          <div className={classes.column}>
            <div className={classes.row}>
              <TopSong data={item} />
              <TopSong data={item} />
              <TopSong data={item} />
              <TopSong data={item} />
              <TopSong data={item} />
            </div>
            <div className={classes.row}>
              <div className={classes.column}>
              {activePrompts && activePrompts.map((prompt, i) => {
                return <ActivePrompt data={prompt} key={i}/>;
                })}
              </div>
              <div className={classes.column}>
                {displaySubmissions && displaySubmissions.map((sub, i) => {
                  return <DisplaySubmission data={sub} key={i}/>;
                })}
                {/* <DisplaySubmission data={item}/>
                <DisplaySubmission data={item}/> */}
              </div>
            </div>
        </div>
      </div>
    </div>
  )} else {
    return <div>Loading...</div>;
  }
  } 
}
