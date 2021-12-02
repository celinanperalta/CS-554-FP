import { useApolloClient } from '@apollo/client'
import React, {useState} from 'react'
import queries from '../queries'

const Register = () => {

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
    console.log(data)
  }

  return (
    <div className= "app">
      <h2>Sign Up</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign In</button>
      </form>
    </div>

  )
}

export default Register;