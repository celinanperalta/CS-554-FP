import React from 'react'
import ActivePrompt from "./activePrompt";
import DisplaySubmission from "./displaySub";
import TopSong from "./topSongCard";




const  Login = () => {

  let item = {id: 12, prompt: "songs thats play when you're on your last final", posted_by: "User3"}
    

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
    <br />
    <br />
    </div>
  )
}

export default Login;