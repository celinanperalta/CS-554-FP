import React from "react";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import { useQuery } from "@apollo/client";
import queries from "../../queries";
import Comment from "../../components/Comment";
import SongSubmission from "../../components/SongSubmission";
import Prompt from "../../components/Prompt";
import CommentFeed from "../../components/CommentFeed";
import SubmissionFeed from "../../components/SubmissionFeed";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  row: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
});

const PromptPage = () => {
  const classes = useStyles();
  const [isNewComments, setIsNewComments] = React.useState(false);

  const { data: userData } = useUser({
    redirectTo: "/login",
  });

  const router = useRouter();
  const { promptId } = router.query;
  const { error, loading, data, refetch} = useQuery(queries.GET_PROMPT, {
    variables: { promptId },
    fetchPolicy: 'network-only'
  });

  if(isNewComments){
    refetch();
  }

  if (loading) {
    return (
      <div className="app">
        <h2>Loading Prompt</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  const refreshComments = async (value) => {
    console.log("outside here");
		setIsNewComments(value);
	};

  return (
    <div className="app">
      <ul className="prompts">
        {data && data.getPromptById ? (
          <div className={classes.row}>
            {/* <h1>{data.getPromptById.prompt}</h1> */}
            <div className={classes.column}>
              <Prompt refreshComments={refreshComments} data={data.getPromptById} />
              {<CommentFeed comments={data.getPromptById.comments} />}
            </div>
            <div className={classes.column}>
              {<SubmissionFeed songs={data.getPromptById.submittedSongs} />}
            </div>
          </div>
        ) : null}
      </ul>
    </div>
  );
};

export default PromptPage;
