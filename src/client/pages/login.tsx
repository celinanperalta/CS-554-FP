import React, {useState} from 'react'
import { useAuth } from '../lib/useAuth'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const { signIn, signOut } = useAuth()

  function onSubmit(e) {
    e.preventDefault()
    signIn({ username, password })
  }

  return (
    <div className= "app">
      <h2>Login</h2>
      <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign In</button>
      </form>
    </div>
    </div>
  )
}

export default Login;