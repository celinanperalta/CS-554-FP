//I pledge my honor that I have abided by the Stevens Honor System.
// import '../App.css';
// import noImage from '../noImage.jpg';
import React, {useState, useEffect}  from "react";
import Link from "next/link";

import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    makeStyles,
    CardHeader,
    Button
    // IconButton
  } from '@material-ui/core';
  
const useStyles = makeStyles({
    card: {
      maxWidth: 250,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 5,
      border: '1px solid #1e8678',
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
    button: {
      color: '#1e8678',
      fontWeight: 'bold',
      fontSize: 12
    }
  });

const BuildCard = (props) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Card className="promptCard" variant="outlined">
                <CardHeader className="promptHeader" subheader={props.data.posted_by} />
                <CardContent>
                    <Typography className="promptContent" >{props.data.prompt}</Typography>
                </CardContent>
                <Link href={`/prompts/${props.data.id}`}>
                    <Button className="promptButon" size="small">LEt mE ComMent pLS</Button>
                </Link>
                <br/>
                <br/>                          
            </Card>
        </Grid>
    )
  }

export default BuildCard;