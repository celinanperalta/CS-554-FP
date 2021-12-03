import client from "../config/esConnection";
import { Comment } from "../schemas/Comment";
import { User } from "../schemas/User";
import {v4 as uuid} from 'uuid';
import userService from "./userService";
import promptService from "./promptService";
import { commentPatch } from "../config/types";


const getComments = async () : Promise<Comment[]> => {
    const {body} = await client.search({
        index: "comments",
        body: {
            query: {
                match_all: {}
            }
        }
    });
    console.log("hi");
    console.log(body.hits.hits.map(hit => hit._source));
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

const addComment = async (prompt_id: string , comment: string,  posted_by: string) : Promise<Comment> => {
    let new_comment = new Comment()
    new_comment.id = uuid()
    new_comment.prompt_id = prompt_id
    new_comment.comment = comment
    new_comment.posted_by = posted_by
    new_comment.likes = 0;
    await client.index({
        index: 'comments',
        id: new_comment.id,
        body: new_comment,
    });

    //Updating user comment id array to hold this one as well
    let user = await userService.getUserById(posted_by);
    user.comments = [...user.comments, new_comment.id];
    await userService.updateUser(user);

    //Updating prompt comment id array to hold this one as well
    let prompt = await promptService.getPromptById(prompt_id);
    prompt.comments = [...prompt.comments, new_comment.id];
    await promptService.updatePrompt(prompt);

    return new_comment;
}

const updateComment = async (newCommentInfo : commentPatch) : Promise<Comment> => {
    if(!newCommentInfo.id || !newCommentInfo.posted_by || !newCommentInfo.prompt_id){
        throw "Must provide comment ID and posted_by and prompt ID to update comment";
    }

    let oldComment = await getCommentById(newCommentInfo.id);
    let newComment : Comment = {...oldComment};
    if(newCommentInfo.comment){newComment.comment=newCommentInfo.comment};
    if(newCommentInfo.likes){newComment.likes=newCommentInfo.likes};
    await client.update({
        index: 'comments',
        id: newComment.id,
        body: {doc: newComment},
    });
    
    return newComment;
}

export default {
    getComments,
    getCommentById,
    addComment,
    updateComment
}