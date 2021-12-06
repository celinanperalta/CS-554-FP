import React from 'react'

const  SignUp = () => {
  return (
    <div className= "app">
      <h2>SignUp</h2>
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
    <button type="submit">SignUp</button>
    </div>
  )
}

export default SignUp;