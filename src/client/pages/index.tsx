import React from 'react'
import Link from "next/link";
import NavBar from '../components/NavBar';
import ActivePrompt from './components/activePrompt';
import DisplaySubmission from './components/displaySub';
import TopSong from './components/topSongCard';
import Profile from './components/userProfile';
import ActivityFeed from './components/activityFeed';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  row: {
      display: 'flex',
     // flexGrow: 1,
      flexDirection: 'row'
  },
  column: {
    display: 'flex',
    //flexGrow: 1,
    flexDirection: 'column'
    // alignItems: 'center'
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
            </div>
            <div className={classes.row}>
              <div className={classes.column}>
                <ActivePrompt data={item}/>
              </div>
              <div className={classes.column}>
                <DisplaySubmission data={item}/>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
