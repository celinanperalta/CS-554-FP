import { useMutation } from "@apollo/client";
import { Modal, Box, IconButton, makeStyles } from "@material-ui/core";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import _ from "lodash";
import React from "react";
import { Song } from "../model/Song";
import { SongSubmission } from "../model/SongSubmission";
import queries from "../queries";
import SpotifySearch from "./SpotifySearch";

const useStyles = makeStyles({
  card: {
    maxWidth: 350,
    minWidth: 350,
    height: "auto",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: 5,
    border: "1px solid #1e8678",
    textAlign: "left",
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
  modalBox: {
    maxWidth: 300,
    minWidth: 300,
    minHeight: 200,
    maxHeight: 200,
    borderRadius: 5,
    border: "1px solid",
    zIndex: 1300,
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30vh",
    padding: "20px",
  },
  inputFields: {
    marginBottom: "10px",
  },
});

const NewSubmission = ({ promptId }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [addSubmission, { loading }] = useMutation(queries.ADD_SONG_SUB, {
    onCompleted: () => {
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
    },
    refetchQueries: [
        {
            query: queries.GET_PROMPT,
            variables: {
                promptId: promptId,
            },
        },
    ],
  });

  const handleSelect = (s : Song) => {
    let newSong = s;
    newSong = _.omit(newSong, "__typename") as Song;
    addSubmission({
      variables: {
        promptId: promptId,
        song: newSong,
      },
    });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.modalBox}>
          <SpotifySearch handleSelect={handleSelect} />
        </Box>
      </Modal>
      <IconButton
        onClick={() => setOpen(!open)}
        color="default"
        aria-label="comment on prompt"
        component="span"
      >
        <PlaylistAddIcon />
      </IconButton>
    </div>
  );
};

export default NewSubmission;
