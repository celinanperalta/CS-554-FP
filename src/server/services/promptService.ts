import client from "../config/esConnection";
import { Prompt } from "../schemas/Prompt";
import {v4 as uuid} from 'uuid';


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
    await client.index({
        index: 'comments',
        id: new_prompt.id,
        body: new_prompt,
    })
    return new_prompt;
}

export default {
    getPrompts,
    getPromptById,
    addPrompt
}