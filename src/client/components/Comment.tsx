import queries from "../queries";
import User from "./User";
import { useQuery, useMutation } from "@apollo/client";
import Close from "@material-ui/icons/Close";
import Like from "@material-ui/icons/FavoriteBorder";

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  Button,
  IconButton,
} from "@material-ui/core";
import ListItem from '@mui/material/ListItem';
import LikeComment from "./LikeComment";
import useUser from "../lib/useUser";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "auto",
    borderRadius: 5,
    border: "1px solid",
    textAlign: "left",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: "#333",
    //color: 'white'
  },
  button: {
    color: "#04AA6D",
    borderColor: "#04AA6D",
    margin: "10px",
  },
  close: {
    display: "flex",
    padding: "0px",
    margin: "0px",
    justifyContent: "right",
    marginRight: "7px",
  },
  icon: {
    padding: "0px",
    margin: "0px",
  },
  status: {
    display: "flex",
    flexDirection: "row",
    padding: "0px",
    margin: "0px",
    justifyContent: "left",
    marginTop: "5px",
  },
  values: {
    padding: "0px",
    margin: "0px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  username: {
    fontWeight: "bold",
    marginRight: "5px",
  },
});

const Comment = (props) => {
  const classes = useStyles();
  const [deleteComment] = useMutation(queries.DELETE_COMMENT, {
    refetchQueries: [
      {
        query: queries.GET_PROMPT,
        variables: {
          promptId: props.promptId,
        },
      },
    ],
  });

  const { data: user } = useUser();

  const { loading, error, data } = useQuery(queries.GET_COMMENT, {
    variables: { id: props.id },
    pollInterval: 10000,
    fetchPolicy: "network-only",
  });

  const handleDelete = () => {
    console.log("deleting now");
    console.log();
    deleteComment({
      variables: { id: data.getCommentById.id },
    });
    console.log("deleted done");
  };

  if (loading) {
    return (
      <div className="app">
        <h2>Loading Comment</h2>
      </div>
    );
  }

  if(data){
  return (
    <ListItem
      key={data.getCommentById.id}
      secondaryAction={user && data.getCommentById.posted_by != user.me.id ? (
        <LikeComment
          id={data.getCommentById.id}
          numLikes={data.getCommentById.likes.length}
          liked={data.getCommentById.likes.includes(user.me.id)}
        />
      ) : (
        <IconButton
        edge="end"
          className={classes.icon}
          onClick={handleDelete}
          color="default"
          aria-label="delete prompt"
          component="span"
        >
          <Close />
        </IconButton>
      )}
      sx={{
        height: "75px"
      }}
    >
      <Typography className={classes.username}>
        <User userId={data.getCommentById.posted_by} />
      </Typography>
      <Typography className="promptContent">
        {data.getCommentById.comment}
      </Typography>
      
    </ListItem>
  );
    }else{
      return <div></div>
    }
};

export default Comment;
