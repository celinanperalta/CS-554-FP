//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, {useState, useEffect}  from "react";
import Link from "next/link";
import Like from '@material-ui/icons/FavoriteBorder';
import Comment from '@material-ui/icons/ChatBubbleOutline';

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
    Modal, Box,
    TextField
  } from '@material-ui/core';
import NewComment from "./NewComment";

const useStyles = makeStyles({
    card: {
      maxWidth: 350,
      minWidth: 350,
      height: 'auto',
      marginLeft: '10px',
      marginRight: '10px',
      marginTop: '10px',
      marginBottom: '10px',
      borderRadius: 5,
      border: '1px solid #1e8678',
      textAlign: "left",
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
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
      height: '100%',
      width: '100%'
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
    // 'button:hover': {
    //     backgroundColor: '#333',
    //     borderColor: '#333',
    //     boxShadow: 'none',
    //   }
    modalBox:{
      maxWidth: 300,
      minWidth: 300,
      minHeight: 200,
      maxHeight: 200,
      borderRadius: 5,
      border: '1px solid',
      zIndex: 1300,
      backgroundColor: 'white',
      margin: 'auto',
      marginTop: '30vh',
      padding: '20px'
    },
    inputFields: {
      marginBottom: '10px'
    }
    // button: {
    //   color: 'white',
    //   borderColor: 'white'
    // }
  });

const Prompt = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return (
        <div>
        <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className={classes.card} variant="outlined">
                <Link href={`/prompts/${props.data.id}`}>
                <CardContent>
                    <Typography className="promptContent">{props.data.prompt}</Typography>
                    <Typography>{props.data.dateCloses}</Typography>
                </CardContent>
                </Link>
                <IconButton color="default" aria-label="like prompt" component="span">
                    <Like />
                </IconButton>
                <IconButton onClick={() => setOpen(!open)} color="default" aria-label="comment on prompt" component="span">
                    <Comment />
                </IconButton>
                <br/>                          
            </Card>
        </Grid>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          {/* onSubmit={handleSubmit} */}
        <Box className={classes.modalBox} >
          <NewComment promptId={props.data.id}/>
        </Box>
      </Modal>
      </div>
    )
  }

export default Prompt;