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
        },
        size: 100
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
    new_comment.likes = [];
    await client.index({
        index: 'comments',
        refresh:'wait_for',
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

    //if comment is updated with likes, user attached must be updated
    if(newComment.likes !== []){
        for(let likeId of newComment.likes){
            if(oldComment.likes.indexOf(likeId) === -1){//if the old comment likes does not contain the new comment likesId, then user should be updated
                let user = await userService.getUserById(likeId);
                user.likes = [...user.likes, newComment.id];
                let updatedUser = await userService.updateUser(user);
                console.log(updatedUser);
            }
        }
    }
    await client.update({
        index: 'comments',
        id: newComment.id,
        refresh:'wait_for',
        body: {doc: newComment},
    });
    
    return newComment;
}

const deleteComment = async (commentId : string) : Promise<Comment> =>{
    if(!commentId){
        throw "must provide comment id to delete"
    }
    let comment = await getCommentById(commentId);
    let {prompt_id, posted_by, likes} = comment;

    //update prompt that had comment attached to it
    let prompt = await promptService.getPromptById(prompt_id);
    let pcIndex = prompt.comments.indexOf(commentId);

    if(pcIndex === -1){
        throw "Error, couldn't find id of comment in prompt";
    }
    prompt.comments.splice(pcIndex,1); //remove comment id from prompt
    let updatedPrompt = await promptService.updatePrompt(prompt);
    console.log(updatedPrompt);

    //update user that posted comment
    let user = await userService.getUserById(posted_by);
    console.log("inside comment delte");
    console.log(user);
    let ucIndex = user.comments.indexOf(commentId);
    if(ucIndex === -1){
        throw "Error, couldn't find id of comment in user object"
    }
    user.comments.splice(ucIndex,1);
    let updatedUser = await userService.updateUser(user);
    console.log(updatedUser);


    //update each user that liked the comment
    for(let userId of likes){
        let userToBeUpdated = await userService.getUserById(userId);
        let userCommentIndex = userToBeUpdated.comments.indexOf(commentId);
        if(userCommentIndex === -1){
            throw "Error, couldn't find id of comment in likes of user"
        }
        userToBeUpdated.comments.splice(userCommentIndex,1);
        let updatedLikedUser = await userService.updateUser(userToBeUpdated);
        console.log(updatedLikedUser);
    }

    await client.delete({
        id:commentId,
        index:'comments',
        refresh:'wait_for'
    });


    return comment;
}

const likeComment = async (id: string, userId: string) : Promise<Comment> =>{
    if(!id || !userId){
        throw "Must provide id and userId to like song submission";
    }
    let comment = await getCommentById(id);
    let indexOfUserId = comment.likes.indexOf(userId);
    if(indexOfUserId === -1){
        comment.likes.push(userId);
    }
    await client.update({
        refresh:'wait_for',
        index: 'comments',
        id: comment.id,
        body: {doc: comment},
    });
    return comment;
}

const unLikeComment = async (id: string, userId: string) : Promise<Comment> =>{
    if(!id || !userId){
        throw "Must provide id and userId to dislike song submission";
    }
    let comment = await getCommentById(id);
    let indexOfUserId = comment.likes.indexOf(userId);
    if(indexOfUserId !== -1){
        comment.likes.splice(indexOfUserId,1);
    }
    await client.update({
        refresh:'wait_for',
        index: 'comments',
        id: comment.id,
        body: {doc: comment},
    });
    return comment;
}


export default {
    getComments,
    getCommentById,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    unLikeComment
}