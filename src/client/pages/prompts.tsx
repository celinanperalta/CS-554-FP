import React from 'react'
import Link from "next/link";
import { useQuery } from '@apollo/client';
import queries from '../queries';
import ActivePrompt from '../components/ActivePrompt';
import {Grid, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
  grid: {
    flexGrow: 1,
    flexDirection: 'row',
    margin: 'auto',
    justifyContent: 'center'
  }
});

const Prompts = () =>{
    const classes = useStyles();
    const {loading, error, data} = useQuery(queries.GET_PROMPTS,{pollInterval: 4000});

    if(loading){
      return <div className="app">
          <h2>Loading Prompts</h2>
          </div>
    }
    return (
        <div className="app">
        <h2>Prompts on this page</h2>
        <Grid container className={classes.grid} spacing={5}>
        {data && data.getPrompts.map((item, index) => (
          <Link as={`/prompts/${item.id}`} href="/prompts/[promptId]">
            <a>
              <ActivePrompt data={item} key={index}/>
            </a>
          </Link>
      ))}
      </Grid>
      <br />

        </div>
    )
}

export default Prompts;