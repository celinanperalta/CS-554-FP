import { useApolloClient } from '@apollo/client'
import React, {useState} from 'react'
import { useAuth } from '../lib/useAuth.jsx'
import useUser from '../lib/useUser'
import queries from '../queries'
import Router from "next/router";
import { Grid, makeStyles, CardHeader, Button , TextField} from "@material-ui/core";

const useStyles = makeStyles({
  submitButton: {
    color: 'dark grey',
    borderColor: 'dark grey',
    marginTop: '25px'
  }
});

const Register = () => {
  const { data } = useUser({
    redirectTo: '/users/me',
    redirectIfFound: true
  })
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const client = useApolloClient()

  const onSubmit = async (e) => {
    e.preventDefault()
    const { data } = await client.mutate({
      mutation: queries.REGISTER_USER,
      variables: {
        username,
        password,
        email
      }
    })
  }

  return (
    <div className= "app">
      <h2>Sign Up</h2>
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
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
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
          <Button className={classes.submitButton} variant="contained" type="submit">Register</Button>
        </Grid>
      </form>
    </div>

  )
}

export default Register;