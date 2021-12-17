import queries from "../queries";
import { useQuery } from "@apollo/client";
import User from "./User";
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
import LikeComment from "./LikeComment";
import UnLikeComment from "./UnLikeComment";
import useUser from "../lib/useUser";

const useStyles = makeStyles({
  card: {
    maxWidth: 450,
    minWidth: 450,
    height: "auto",
    margin: "10px",
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
  // 'button:hover': {
  //     backgroundColor: '#333',
  //     borderColor: '#333',
  //     boxShadow: 'none',
  //   }
});

const Comment = (props) => {
  const classes = useStyles();
  const user = useUser().data;
  const { loading, error, data } = useQuery(queries.GET_COMMENT, {
    variables: { commentId: props.commentId },
    pollInterval: 10000,
    fetchPolicy: 'network-only'
  });


  if (loading) {
    return (
      <div className="app">
        <h2>Loading Comment</h2>
      </div>
    );
  }
  return (
    <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className="promptContent">
            {data.getCommentById.comment}
          </Typography>
          <Typography>
            <User userId={data.getCommentById.posted_by}/>
          </Typography>
          {user && data.getCommentById.likes.includes(user.me.id) ? 
              <UnLikeComment id={data.getCommentById.id} /> : 
              <LikeComment id={data.getCommentById.id} />}
          {data.getCommentById.likes.length}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Comment;
