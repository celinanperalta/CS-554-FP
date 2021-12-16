import React from "react";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import { useQuery } from "@apollo/client";
import queries from "../../queries";
import Comment from "../../components/Comment";
import SongSubmission from "../../components/SongSubmission";
import ActivePrompt from '../../components/ActivePrompt';
import CommentFeed from "../../components/CommentFeed";
import SubmissionFeed from "../../components/SubmissionFeed";

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  row: {
      display: 'flex',
      flexDirection: 'row',
      padding: '20px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  }

});


const Prompt = () => {
  const classes = useStyles();
  const userData = useUser({
    redirectTo: "/login",
  }).data;



  const router = useRouter();
  const { promptId } = router.query;
  const { error, loading, data } = useQuery(queries.GET_PROMPT, { variables: {promptId}, pollInterval: 4000 })

  if (loading) {
    return <div className="app">
      <h2>Loading Prompts</h2>
    </div>
  }

  console.log("here")
  console.log(data.getPromptById.submittedSongs);

  return (
    <div className="app">
      <ul className="prompts">
        {data && data.getPromptById ?
        <div className={classes.row}>
          {/* <h1>{data.getPromptById.prompt}</h1> */}
          <div className={classes.column}>
          <ActivePrompt data={data.getPromptById} />
          {<CommentFeed comments={data.getPromptById.comments} />}
          </div>
          <div className={classes.column}>
          {<SubmissionFeed songs={data.getPromptById.submittedSongs} />}
          </div>

        </div>
        : null}
      </ul>

    </div>
  )
};

export default Prompt;
