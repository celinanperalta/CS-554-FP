//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SongSubmission from "../components/SongSubmission";
import { useQuery } from "@apollo/client";
import queries from "../queries";
import User from "./User"
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
    Box
} from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        maxWidth: 300,
        minWidth: 300,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '0px solid',
        justifyContent: 'center',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
        overflow: 'scroll'
    },
    commentCard: {
        maxWidth: 450,
        minWidth: 450,
        height: "auto",
        margin: "10px",
        borderRadius: 5,
        border: "1px solid",
        textAlign: "left",
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
    feedHeader: {
        backgroundColor: "#333",
        padding: "10px",
        margin: "0px",
        color: "white",
        display: "flex",
        flexDirection: "row",
        borderRadius: 5,
    },
    refreshButton: {
        color: "white",
        borderColor: "white",
        paddingLeft: 20
    },
    promptHeader: {
        margin: "auto",
        marginLeft: "10px",
      },
});

const AllCommentsFeed = () => {
    const classes = useStyles();
    const { loading, error, data, refetch } = useQuery(queries.GET_COMMENTS);

    return (
        <Grid item className={classes.grid} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Box className={classes.card}>
            <div className={classes.feedHeader}>
                <h2 className={classes.promptHeader}>All Comments</h2>
                    <Button onClick={() =>refetch()} className={classes.refreshButton}>Refresh</Button>
                </div>
                {data && data.getComments.slice(0).reverse().map((comment) => {
                    return <Card key={comment} className={classes.card} variant="outlined">
                        <Typography className="promptContent">
                            {comment.comment}
                        </Typography>
                        <Typography>
                            <User userId={comment.posted_by} />
                        </Typography>
                        <Link href={`/prompts/${comment.prompt_id}`}>
                        <a style={{color:"green"}}>Go To Prompt</a>
                        </Link>
                    </Card>
                })}
            </Box>
        </Grid>
    )
}

export default AllCommentsFeed;