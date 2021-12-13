import queries from "../queries";
import { useQuery } from "@apollo/client";
import User from "./User";

const Comment = (props) =>{

    const {loading, error, data} = useQuery(queries.GET_COMMENT, {variables: {commentId:props.commentId}, pollInterval: 10000})

    if (loading) {
        return <div className="app">
          <h2>Loading Comment</h2>
        </div>
    }

        return(
            <div>
                <ul>
                    <li>{data.getCommentById.comment}</li>
                    <li>{data.getCommentById.likes.length} likes</li>
                    <User userId={data.getCommentById.posted_by}/>
                </ul>
            </div>
        )
}

export default Comment;