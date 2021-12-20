import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import queries from "../../queries";
import PromptFeed from "../../components/PromptFeed";
import Winner from '@material-ui/icons/EmojiEvents';
import Likes from '@material-ui/icons/FavoriteBorder';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  Button,
  IconButton
} from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    maxWidth: 300,
    minWidth: 300,
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    border: '0px',
    textAlign: "center",
  },
  titleHead: {
    borderBottom: '1px solid #1e8678',
    fontWeight: 'bold'
  },
  grid: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  media: {
    height: '75%',
    width: '75%',
    borderRadius: '50%',
    paddingBottom: '10px',
    margin: 'auto'
  },
  header: {
      backgroundColor: '#333',
      //color: 'white'
  },
  button: {
    color: '#04AA6D',
    borderColor: '#04AA6D',
    margin: "10px"
  },
  content: {
      marginBottom: '0px',
      paddingBottom: '0px'
  },
  status: {
      display: 'flex',
      flexDirection: 'row',
      padding: '0px',
      margin: '0px',
      justifyContent: 'center',
      marginTop: '5px'
  },
  values: {
      padding: '0px',
      margin: '0px',
      paddingLeft: '10px',
      paddingRight: '10px'
  },
  container: {
  spacing:0,
  alignItems:"center",
  justifyContent:"center"

},
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

const User = () => {
  const userData = useUser({
    redirectTo: "/login",
  });
  const classes = useStyles();

  const router = useRouter();
  const { userId } = router.query;

  const { data: user, loading, error } = useQuery(queries.GET_USER, {
    variables: {
      id: userId,
    },
  });

  if (loading || !user) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className={classes.row}>
      <div className={classes.column}>
            <Card className={classes.card} variant="outlined">
                <CardContent className={classes.content}>
                    <CardMedia
                    component="img"
                    image={user.getUserById.profile_picture}
                    // image={user.getUserById.profile_picture}
                    alt="user profile pic"
                    className={classes.media}
                    />
                    <br />
                    <Typography variant="h5">@{user.getUserById.username}</Typography>
                    <br />
                </CardContent>
                    <div className={classes.status}>
                        <Winner />
                        <p className={classes.values}>{user.getUserById.submissions.length}</p> 
                        <Likes />
                        <p className={classes.values}>{user.getUserById.votes.length}</p>
                    </div>
                <br/>                       
            </Card>
        </div>
        <div className={classes.column}>
          <PromptFeed userId={user.getUserById.id} prompts={user.getUserById.prompts} />
        </div>
      </div>
  );
};

export default User;
