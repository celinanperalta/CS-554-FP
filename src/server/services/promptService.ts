import client from "../config/esConnection";
import { Prompt } from "../schemas/Prompt";
import {v4 as uuid} from 'uuid';
import { promptPatch } from "../config/types";
import userService from "./userService";

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
   await client.update({
    index: 'prompts',
    id: newPrompt.id,
    body: {doc:newPrompt}
    });

    return newPrompt;   
}


export default {
    getPrompts,
    getPromptById,
    addPrompt,
    updatePrompt
}