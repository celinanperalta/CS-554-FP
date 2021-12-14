import React from 'react'
import Link from "next/link";
import NavBar from '../components/NavBar';
import ActivePrompt from '../components/ActivePrompt';
import DisplaySubmission from '../components/SubmissionDisplay';
import TopSong from '../components/TopSongCard';
import Profile from '../components/UserProfile';
import ActivityFeed from '../components/ActivityFeed';

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
  let item = {id: 12, prompt: "songs thats play when you're on your last final", posted_by: "User3"}
  
  return (
    <div className= "app">
      <div className={classes.row}>
          <div className={classes.column}>
            <Profile />
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
                <ActivePrompt data={item}/>
                <ActivePrompt data={item}/>
                <ActivePrompt data={item}/>
              </div>
              <div className={classes.column}>
                <DisplaySubmission data={item}/>
                <DisplaySubmission data={item}/>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
