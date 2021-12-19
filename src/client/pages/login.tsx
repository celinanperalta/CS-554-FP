import React, {useState} from 'react'
import { useAuth } from '../lib/useAuth'
import {useRouter} from "next/router";
import useUser from '../lib/useUser';
import { Grid, makeStyles, CardHeader, Button , TextField} from "@material-ui/core";

const useStyles = makeStyles({
  submitButton: {
    color: 'dark grey',
    borderColor: 'dark grey',
    marginTop: '25px'
  }
});

const Login = () => {

  const { data } = useUser({
    redirectTo: '/users/me',
    redirectIfFound: true
  })
  
  const classes = useStyles();
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const { signIn } = useAuth()

  async function onSubmit(e) {
    e.preventDefault()
    await signIn({ username, password })
  }

  return (
    <div className= "app">
      <h2>Login</h2>
      <div>
      <form onSubmit={onSubmit}>
        <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
          <Grid item>
            <TextField
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            ></TextField>
          </Grid>
          <br/>
          <Grid item>
            <TextField
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Grid>
          <Button className={classes.submitButton} variant="contained" type="submit">Sign In</Button>
        </Grid>
        </form>
    </div>
    </div>
  )
}

export default Login;