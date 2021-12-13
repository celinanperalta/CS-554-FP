import client from "../config/esConnection";
import { Prompt } from "../schemas/Prompt";
import {v4 as uuid} from 'uuid';
import { promptPatch } from "../config/types";
import userService from "./userService";
import songSubmissionService from "./songSubmissionService";
import commentService from "./commentService";

const getPrompts = async () : Promise<Prompt[]> => {
    const {body} = await client.search({
        index: "prompts",
        body: {
            query: {
                match_all: {}
            }
        }
    });
    return body.hits.hits.map(hit => hit._source)
}

const getPromptById = async (id: string) : Promise<Prompt> => {
    const {body} = await client.search({
        index: "prompts",
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

const addPrompt = async ( prompt: string,  posted_by: string,  submittedSongs: string[], comments: string[]) : Promise<Prompt> => {
    let new_prompt = new Prompt()
    new_prompt.id = uuid()
    new_prompt.prompt = prompt
    new_prompt.posted_by = posted_by
    new_prompt.comments = comments
    new_prompt.submittedSongs = submittedSongs;
    new_prompt.datePosted = new Date();
    let now = new Date();
    now.setDate(now.getDate() + 7);
    new_prompt.dateCloses = now;
    new_prompt.isClosed = false;
    await client.index({
        index: 'prompts',
        id: new_prompt.id,
        body: new_prompt,
    })


    //updating user's prompt id array to hold this as well
    let user = await userService.getUserById(posted_by);
    user.prompts = [...user.prompts, new_prompt.id];
    console.log(user.prompts);
    await userService.updateUser(user);

    return new_prompt;
}

const updatePrompt = async ( newPromptInfo : promptPatch) : Promise<Prompt> => {
    if(!newPromptInfo.id || !newPromptInfo.posted_by){
        throw "Must provide prompt ID and userposted to update prompt";
    }
   console.log(newPromptInfo);
   let oldPrompt = await getPromptById(newPromptInfo.id);
   let newPrompt : Prompt = {...oldPrompt};
   if(newPromptInfo.comments){newPrompt.comments=newPromptInfo.comments};
   if(newPromptInfo.prompt){newPrompt.prompt=newPromptInfo.prompt};
   if(newPromptInfo.submittedSongs){newPrompt.submittedSongs=newPromptInfo.submittedSongs};
   if(newPromptInfo.dateCloses){newPrompt.dateCloses=newPromptInfo.dateCloses};
   if(newPromptInfo.isClosed){newPrompt.isClosed=newPromptInfo.isClosed};
   await client.update({
    index: 'prompts',
    id: newPrompt.id,
    refresh:'wait_for',
    body: {doc:newPrompt}
    });

    return newPrompt;   
}

const deletePrompt = async (promptId: string) : Promise<Prompt> =>{
    if(!promptId){
        throw "Error: must provide id to delete prompt";
    }

    let prompt = await getPromptById(promptId);
    let {posted_by, submittedSongs, comments} = prompt

    //update user attached to it
    let user = await userService.getUserById(posted_by);
    let promptIndex = user.prompts.indexOf(promptId);
    if(promptIndex === -1){
        throw "Error: couldn't find prompt id in user"
    }
    user.prompts.splice(promptIndex,1);
    console.log("here");
    console.log(user.prompts);
    let updatedUser = await userService.updateUser(user);
    console.log(updatedUser);

    //delete each songsubmission
    for(let songSubId of prompt.submittedSongs){
        let deletedSongSub = await songSubmissionService.deleteSongSubmission(songSubId);
    }

    //delete each comment
    console.log("inside delete prompts")
    console.log(prompt.comments);
    for(let commentId of prompt.comments){
        let deletedComment = await commentService.deleteComment(commentId);
    }

    await client.delete({
        id:promptId,
        index:'prompts',
        refresh:'wait_for'
    });

    return prompt;
}

export default {
    getPrompts,
    getPromptById,
    addPrompt,
    updatePrompt,
    deletePrompt
}