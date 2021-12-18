import React from "react";
import queries from "../queries";
import { useQuery, useMutation } from "@apollo/client";
import { makeStyles, Modal, Box, IconButton, TextField, Button } from "@material-ui/core";
import { Comment } from "@material-ui/icons";
import { useAuth} from "../lib/useAuth";
import useUser from "../lib/useUser";
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
    border: "1px solid #ededed",
    zIndex: 1300,
    backgroundColor: "white",
    margin: "auto",
    marginTop: "30vh",
    padding: "20px",
  },
  inputFields: {
    marginBottom: "10px",
  },
  submitButton: {
    color: 'dark grey',
    borderColor: 'dark grey',
    marginTop: '25px'
  },
  input: {
    marginBottom: '10px'
  },
  deleteButton: {
    color: 'red',
    borderColor: 'dark red',
    marginTop: '25px'
  }
});

const DeleteAccountModal = (props) => {
  const { data } = useUser({
    redirectTo: "/login",
  });
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const { signOut } = useAuth();
  const [deleteUser] = useMutation(queries.DELETE_USER)

  const deleteAccount = (e) => {
    e.preventDefault();
    console.log("here");
    setOpen(false);
    deleteUser({variables: {id: data.me.id}})
    signOut();
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
            <p className={classes.input} >Are you sure you want to delete your account? {"\n"} This cannot be undone.</p>
            <Button className={classes.submitButton} variant="outlined" type="submit" onClick={handleClose}>Cancel</Button>
            <Button className={classes.deleteButton} variant="outlined" type="submit" onClick={deleteAccount}>Delete Account</Button>
        </Box>
      </Modal>
      <Button className={classes.deleteButton} variant="contained" type="submit" onClick={() => setOpen(!open)} >
            Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccountModal;
