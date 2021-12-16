import queries from "../queries";
import { useQuery } from "@apollo/client";
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
import LikeSubmission from "./LikeSubmission";

const useStyles = makeStyles({
  card: {
    maxWidth: 450,
    minWidth: 450,
    height: "auto",
    margin: "10px",
    borderRadius: 5,
    border: "1px solid",
    textAlign: "left",
    padding: "10px",
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
  status: {
    display: "flex",
    flexDirection: "row",
    padding: "0px",
    margin: "0px",
    justifyContent: "right",
    marginTop: "5px",
  },
  values: {
    padding: "0px",
    margin: "0px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  userName: {
    maxWidth: "fit",
  },
  player: {
    border: "1px solid #333",
    borderRadius: 5,
    marginBottom: "5px",
  },
  content: {
    padding: "0px",
  },

  // 'button:hover': {
  //     backgroundColor: '#333',
  //     borderColor: '#333',
  //     boxShadow: 'none',
  //   }
});

const SongSubmission = (props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(queries.GET_SONG_SUB, {
    variables: { id: props.songSubId },
    pollInterval: 5000,
    fetchPolicy: 'network-only'
  });

  if (loading) {
    return (
      <div className="app">
        <h2>Loading Song Submission</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="app">
        <h2>Error loading Song Submission</h2>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.card} variant="outlined">
        <iframe
          className={classes.player}
          src={`https://open.spotify.com/embed/track/${data.getSongSubmissionById.song.id}?utm_source=generator`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
        <CardContent className={classes.content}>
          <Typography>
            {data.getSongSubmissionById.song.name} by{" "}
            {data.getSongSubmissionById.song.artist}
          </Typography>
          <div>
            <div className={classes.status}>
              <LikeSubmission submission={data.getSongSubmissionById} />
              <p className={classes.values}>
                {" "}
                {data.getSongSubmissionById.votes.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SongSubmission;
