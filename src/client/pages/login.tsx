import React from 'react'
import ActivePrompt from "./activePrompt";
import DisplaySubmission from "./displaySub";
import TopSong from "./topSongCard";
import Profile from "./userProfile";
import ActivityFeedCard from "./activityFeedCard";
import ActivityFeed from "./activityFeed";

const  Login = () => {

  let item = {id: 12, prompt: "songs thats play when you're on your last final", posted_by: "User3"}
  let activity = {action: "new submission", prompt: "songs thats play when you're on your last final"}

    

  return (
    <div className= "app">
      <h2>Login</h2>
      <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name="loginForm"
      // className="center"
    >
      <label>
        <span>Username: </span>
        <input
          autoComplete="off"
          type="text"
          name="username"
          // onChange={login}
        />
      </label>
      <br />
      <label>
        <span>Password: </span>
        <input
          autoComplete="off"
          type="text"
          name="password"
          // onChange={login}
        />
      </label>
    </form>
    <button type="submit">Login</button>
    <ActivePrompt data={item} />
    <DisplaySubmission data={item} />
    <TopSong data={item} />
    <Profile data={item} />
    <ActivityFeedCard data={activity} />
    <ActivityFeed />
    <br />
    <br />
    </div>
  )
}

export default Login;