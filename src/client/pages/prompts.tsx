import React from 'react'
import Link from "next/link";
import Card from "./card";
import {Grid, makeStyles} from '@material-ui/core';

const Prompts = () =>{

    const dummyList = [
    {id: 1, prompt: "Dummy Prompt 1", posted_by: "User1"}, 
    {id: 2, prompt: "Dummy Prompt 2", posted_by: "User1"}, 
    {id: 3, prompt: "Dummy Prompt 3", posted_by: "User2"}, 
    {id: 4, prompt: "Dummy Prompt 4", posted_by: "User3"}
    ]

    return (
        <div className="app">
            <h2>Prompts on this page</h2>
            <ul className="prompts">
        <Grid container className="" spacing={5}>
        {dummyList.map((item, index) => (
            <Card key={index} data={item} />
        ))}
      </Grid>
    </ul>

        </div>
    )
}

export default Prompts;