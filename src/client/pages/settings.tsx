import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useUser from "../lib/useUser";
import { useQuery, useMutation } from "@apollo/client";
import queries from "../queries";
import { useAuth} from "../lib/useAuth";
import { Grid, makeStyles, CardHeader, Button , TextField} from "@material-ui/core";

const useStyles = makeStyles({
  submitButton: {
    color: 'dark grey',
    borderColor: 'dark grey',
    marginTop: '25px'
  }
});
const settings = () => {
  const classes = useStyles();
  const router = useRouter();
  const [updateUser] = useMutation(queries.UPDATE_USER);
  const [formValues, setFormValues] = useState({username:"", email: "", password:"", passwordReenter: ""});
  const { signOut } = useAuth();
  const { data } = useUser({
    redirectTo: "/login",
  });

  const user = useQuery(queries.GET_USER, {
    skip: !data,
    variables: {
      id: data && data.me && data.me.id,
    },
  });

  useEffect(()=>{
    if(data && data.me){
        setFormValues({...formValues, username:data.me.username, email: data.me.email})
    }
  },[data])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(value.trim() == ""){return};
    setFormValues({
      ...formValues,
      [name]: value.trim(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let updatedUsername; 
    let updatedEmail; 
    let updatedPassword; 
    if(formValues.username !== "" && formValues.username !== data.me.username ){updatedUsername=formValues.username}
    if(formValues.email !== "" && formValues.email !== data.me.email ){updatedEmail=formValues.email}
    if(formValues.password !== "" && formValues.passwordReenter !== "" && formValues.password===formValues.passwordReenter){updatedPassword=formValues.password}
    else{
        if((formValues.password !== "" && formValues.passwordReenter==="" ) || (formValues.password === "" && formValues.passwordReenter !=="" ) || (formValues.password!==formValues.passwordReenter)){
            alert("Error: password must be entered the same twice.")
            return;
        }
    }
    updateUser( {variables: {id: data.me.id, username:updatedUsername, email: updatedUsername, password: updatedPassword} });
    if(updatedPassword){signOut()}
    else{router.push('/users/me');}
    console.log(formValues);
  };

  

  if (data && data.me) {
    return (
      <div className="app">
          <h2>Change User Information</h2>
        <form onSubmit={handleSubmit} >
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Grid item>
              <TextField
                id="username-input"
                name="username"
                label="Edit Username"
                type="string"
                defaultValue={data.me.username}
                onChange={handleInputChange}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                id="email-input"
                name="email"
                label="Edit Email"
                type="string"
                defaultValue={data.me.email}
                onChange={handleInputChange}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                id="password-input"
                name="password"
                label="Edit Password"
                type="password"
                onChange={handleInputChange}
              />
            </Grid>
            <br />
            <Grid item>
              <TextField
                id="password-reenter-input"
                name="passwordReenter"
                label="Reenter Password"
                type="password"
                onChange={handleInputChange}
              />
            </Grid>
            <br />
            <Button className={classes.submitButton} variant="contained" type="submit">
            Submit
            </Button>
          </Grid>
          
        </form>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default settings;
