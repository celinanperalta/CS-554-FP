import React from "react";
import { useRouter } from "next/router";
import useUser from "../../lib/useUser";
import { useQuery } from "@apollo/client";
import queries from "../../queries";
import Comment from "../../components/Comment";
import SongSubmission from "../../components/SongSubmission";
const Prompt = () => {
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
      <h2>Prompts on this page</h2>
      <ul className="prompts">
        {data && data.getPromptById ?
        <div>
          <h1>{data.getPromptById.prompt}</h1>
          <h2>Song Suggestions</h2>
          {data.getPromptById.submittedSongs.map((songSub)=>{return <SongSubmission key={songSub} songSubId={songSub}/>})}
          <h2>Comments</h2>
          {data.getPromptById.comments.map((comment)=>{return <Comment key={comment} commentId={comment}/>})}
        </div>
        : null}
      </ul>

    </div>
  )
};

export default Prompt;
