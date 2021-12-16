import { useQuery } from "@apollo/client";
import SpotifyLoginButton from "../../components/SpotifyLoginButton";
import withPrivateRoute from "../../components/withPrivateRoute";
import useUser from "../../lib/useUser";
import queries from "../../queries";
import SpotifySearch from "../../components/SpotifySearch";
import NewPrompt from "../../components/NewPrompt";
import Profile from '../../components/UserProfile';
import PromptFeed from '../../components/PromptFeed';


import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  row: {
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
      justifyContent: 'center'

  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    textAlign: 'center'
  }

});

const Me = () => {
  const classes = useStyles();
  const { data } = useUser({
    redirectTo: "/login",
  });

  const user = useQuery(queries.GET_USER, {
    skip: !data,
    variables: {
      id: data && data.me && data.me.id,
    },
  });

  if (data && user.data) {
    return (
      <div className={classes.row}>
      <div className={classes.column}>
        {/* <h1>My Profile</h1> */}
        <Profile user={user.data.getUserById} />
        {/* <p>{user.data.getUserById.id}</p> */}
        {/* <p>{user.data.getUserById.username}</p> */}
        {/* <p>{user.data.getUserById.profile_picture}</p> */}
        {/* <p>{user.data.getUserById.prompts}</p> */}
        {/* <SpotifyLoginButton /> */}
      </div>
      <div className={classes.column}>
        <PromptFeed prompts={user.data.getUserById.prompts} />
        {/* <NewPrompt/> */}
      </div>
      {user.data.getUserById.accessToken && (
      <div className={classes.row}>
        <SpotifySearch />
      </div>
      )}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Me;
