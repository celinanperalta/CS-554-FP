import queries from "../queries";
import { useQuery } from "@apollo/client";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  CardMedia,
  CardHeader,
  Grid,
} from "@material-ui/core";
import LikeSubmission from "./LikeSubmission";
import useUser from "../lib/useUser";
import UserAvatar from "./UserAvatar";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles({
  card: {
    minWidth: 400,
    width: "100%",
    height: 200,
    borderRadius: 5,
    textAlign: "left",
    border: "0px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
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
  content: {},
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
      <Card className={classes.card}>
        <p></p>
      </Card>
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
    <Card className={classes.card}>
      <UserAvatar
        userId={data.getSongSubmissionById.submitted_by}
        action={
          user && (
            <LikeSubmission
              id={data.getSongSubmissionById.id}
              numLikes={data.getSongSubmissionById.votes.length}
              liked={data.getSongSubmissionById.votes.includes(user.me.id)}
            />
          )
        }
      />
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs="auto">
            <iframe
              className={classes.player}
              src={`https://open.spotify.com/embed/track/${data.getSongSubmissionById.song.id}?utm_source=generator`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SongSubmission;
