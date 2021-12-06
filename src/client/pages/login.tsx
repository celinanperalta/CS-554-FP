import React from 'react'

const  Login = () => {
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
    </div>
  )
}

export default Login;