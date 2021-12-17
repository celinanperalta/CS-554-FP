import queries from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import Close from '@material-ui/icons/Close';
import Like from '@material-ui/icons/FavoriteBorder';

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
  close: {
    display: 'flex',
    padding: '0px',
    margin: '0px',
    justifyContent: 'right',
    marginTop: '5px',
    marginRight: '7px',
  },
  icon: {
    padding: '0px',
    margin: '0px'
  },
  status: {
        display: 'flex',
        flexDirection: 'row',
        padding: '0px',
        margin: '0px',
        justifyContent: 'left',
        marginTop: '5px'
    },
    values: {
        padding: '0px',
        margin: '0px',
        paddingLeft: '10px',
        paddingRight: '10px'
    },
});

const Comment = (props) => {
  const classes = useStyles();
  const [deleteComment] = useMutation(queries.DELETE_COMMENT);

  const { loading, error, data } = useQuery(queries.GET_COMMENT, {
    variables: { commentId: props.commentId },
    pollInterval: 10000,
  });

  const handleDelete = () => {
    console.log("deleting now")
    console.log();
    deleteComment({
      variables: {id: data.getCommentById.id}
    });
    console.log("deleted done")
  }

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
        <div className={classes.close}>
          <IconButton className={classes.icon} onClick={handleDelete} color="default" aria-label="like prompt" component="span">
            <Close />
          </IconButton>
        </div>
        <CardContent>
          <Typography className="promptContent">
            {data.getCommentById.comment}
          </Typography>
          <Typography>
            {data.getCommentById.posted_by} 
          </Typography>
          <div className={classes.status}>
              <Like />
              {console.log(data.getCommentById)}
              <p className={classes.values}> {data.getCommentById.likes.length}</p> 
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Comment;
