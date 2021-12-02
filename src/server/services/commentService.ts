import client from "../config/esConnection";
import { Comment } from "../schemas/Comment";
import { User } from "../schemas/User";
import {v4 as uuid} from 'uuid';

const getComments = async () : Promise<Comment[]> => {
    const {body} = await client.search({
        index: "comments",
        body: {
            query: {
                match_all: {}
            }
        }
    });
    return body.hits.hits.map(hit => hit._source)
}

const getCommentById = async (id: string) : Promise<Comment> => {
    const {body} = await client.search({
        index: "comments",
        body: {
            query: {
                match: {
                    id: id
                }
            }
        }
    });
    return body.hits.hits[0]._source
}

const addComment = async (prompt_id: string , comment: string,  posted_by: User,  likes: number) : Promise<Comment> => {
    let new_comment = new Comment()
    new_comment.id = uuid()
    new_comment.comment = comment
    new_comment.posted_by = posted_by
    new_comment.likes = likes
    await client.index({
        index: 'comments',
        id: new_comment.id,
        body: new_comment,
    })
    return new_comment;
}

export default {
    getComments,
    getCommentById,
    addComment
}