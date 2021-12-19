import queries from "../queries";
import { useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  CardMedia,
} from "@material-ui/core";
import LikeSubmission from "./LikeSubmission";
import useUser from "../lib/useUser";
import UserAvatar from "./UserAvatar";

const useStyles = makeStyles({
  card: {
    maxWidth: 450,
    minWidth: 450,
    height: "auto",
    margin: "10px",
    borderRadius: 5,
    border: "0px solid",
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
  cmedia: {
    width: "60px",
    height: "auto",
  },
  songInfo: {
    display: "flex",
    flexDirection: "column",
  },
  songTitle: {
    fontWeight: "bold",
  },
});

const SongSubmission = (props) => {
  const user = useUser().data;
  const classes = useStyles();
  const { loading, error, data } = useQuery(queries.GET_SONG_SUB, {
    variables: { id: props.songSubId },
    pollInterval: 5000,
    fetchPolicy: "network-only",
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
    // <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
    <Card className={classes.card} variant="outlined">
      <UserAvatar userId={data.getSongSubmissionById.submitted_by} />
      <iframe
        className={classes.player}
        src={`https://open.spotify.com/embed/track/${data.getSongSubmissionById.song.id}?utm_source=generator`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
      <CardContent className={classes.content}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs="auto">
            <CardMedia
              component="img"
              image={data.getSongSubmissionById.song.imageUrl}
              alt={data.getSongSubmissionById.song.title}
              className={classes.cmedia}
            />
          </Grid>
          <Grid item xs={8}>
            <div className={classes.songInfo}>
              <Typography className={classes.songTitle}>
                {data.getSongSubmissionById.song.name}
              </Typography>
              <Typography variant="caption">
                {data.getSongSubmissionById.song.artist}
              </Typography>
            </div>
            <div className={classes.status}>
              {user && (
                <LikeSubmission
                  id={data.getSongSubmissionById.id}
                  numLikes={data.getSongSubmissionById.votes.length}
                  liked={data.getSongSubmissionById.votes.includes(user.me.id)}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    // </Grid>
  );
};

export default SongSubmission;
