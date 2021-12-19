import client from "../config/esConnection";
import { Prompt } from "../schemas/Prompt";
import { v4 as uuid } from "uuid";
import { promptPatch } from "../config/types";
import userService from "./userService";
import songSubmissionService from "./songSubmissionService";
import commentService from "./commentService";
import * as _ from "lodash"
import songService from "./songService";
import { Song } from "../schemas/Song";
import { SongSubmission } from "../schemas/SongSubmission";

const getPrompts = async (): Promise<Prompt[]> => {
  const { body } = await client.search({
    index: "prompts",
    body: {
      query: {
        match_all: {},
      },
    },
    size: 100
  });
  let results : Prompt[] = body.hits.hits.map((hit) => hit._source);
  // sort results by date posted
  
  results.forEach((result : Prompt) => {
    result.dateCloses = new Date(result.dateCloses);
    result.datePosted = new Date(result.datePosted);
  });
  
  _.sortBy(results, ["datePosted", "dateCloses"]);
  return results;
};

const getPromptById = async (id: string): Promise<Prompt> => {
  const { body } = await client.search({
    index: "prompts",
    body: {
      query: {
        match: {
          id: id,
        },
      },
    },
  });
  body.hits.hits[0]._source.dateCloses = new Date(
    body.hits.hits[0]._source.dateCloses
  );
  body.hits.hits[0]._source.datePosted = new Date(
    body.hits.hits[0]._source.datePosted
  );
  return body.hits.hits[0]._source;
};

const addPrompt = async (
  prompt: string,
  posted_by: string,
  dateCloses: Date
): Promise<Prompt> => {
  let new_prompt = new Prompt();
  new_prompt.id = uuid();
  new_prompt.prompt = prompt;
  new_prompt.posted_by = posted_by;
  new_prompt.comments = [];
  new_prompt.submittedSongs = [];
  new_prompt.datePosted = new Date();
  if (dateCloses) {
    new_prompt.dateCloses = dateCloses;
  } else {
    let now = new Date();
    now.setDate(now.getDate() + 7);
    new_prompt.dateCloses = now;
  }
  new_prompt.isClosed = false;
  await client.index({
    index: "prompts",
    id: new_prompt.id,
    body: new_prompt,
  });

  //updating user's prompt id array to hold this as well
  let user = await userService.getUserById(posted_by);
  user.prompts = [...user.prompts, new_prompt.id];
  console.log(user.prompts);
  await userService.updateUser(user);

  return new_prompt;
};

const updatePrompt = async (newPromptInfo: promptPatch): Promise<Prompt> => {
  if (!newPromptInfo.id || !newPromptInfo.posted_by) {
    throw "Must provide prompt ID and userposted to update prompt";
  }
  console.log("update:");
  console.log(newPromptInfo);
  let oldPrompt = await getPromptById(newPromptInfo.id);
  let newPrompt: Prompt = { ...oldPrompt };
  if (newPromptInfo.comments) {
    newPrompt.comments = newPromptInfo.comments;
  }
  if (newPromptInfo.prompt) {
    newPrompt.prompt = newPromptInfo.prompt;
  }
  if (newPromptInfo.submittedSongs) {
    newPrompt.submittedSongs = newPromptInfo.submittedSongs;
  }
  if (newPromptInfo.dateCloses) {
    newPrompt.dateCloses = newPromptInfo.dateCloses;
  }
  if (newPromptInfo.isClosed) {
    newPrompt.isClosed = newPromptInfo.isClosed;
  }
  await client.update({
    index: "prompts",
    id: newPrompt.id,
    refresh: "wait_for",
    body: { doc: newPrompt },
  });

  return newPrompt;
};

const deletePrompt = async (promptId: string): Promise<Prompt> => {
  if (!promptId) {
    throw "Error: must provide id to delete prompt";
  }

  let prompt = await getPromptById(promptId);
  let { posted_by, submittedSongs, comments } = prompt;

  //update user attached to it
  let user = await userService.getUserById(posted_by);
  let promptIndex = user.prompts.indexOf(promptId);
  if (promptIndex === -1) {
    throw "Error: couldn't find prompt id in user";
  }
  user.prompts.splice(promptIndex, 1);
  console.log("here");
  console.log(user.prompts);
  let updatedUser = await userService.updateUser(user);
  console.log(updatedUser);

  //delete each songsubmission
  for (let songSubId of prompt.submittedSongs) {
    let deletedSongSub = await songSubmissionService.deleteSongSubmission(
      songSubId
    );
  }

  //delete each comment
  console.log("inside delete prompts");
  console.log(prompt.comments);
  for (let commentId of prompt.comments) {
    let deletedComment = await commentService.deleteComment(commentId);
  }

  await client.delete({
    id: promptId,
    index: "prompts",
    refresh: "wait_for",
  });

  return prompt;
};

const getTopSong = async (promptId: string) : Promise<SongSubmission> =>{
  if (!promptId) {
    throw "Error: must provide id to delete prompt";
  }
  let prompt = await getPromptById(promptId);
  let mostVotes = -1;
  let topSong : SongSubmission; 
  for(let songSubId of prompt.submittedSongs){
    let songsub = await songSubmissionService.getSongSubmissionById(songSubId);
    if(songsub.votes.length > mostVotes){
      topSong = songsub;
    }
  }
  return topSong;
}

export default {
  getPrompts,
  getPromptById,
  addPrompt,
  updatePrompt,
  deletePrompt,
  getTopSong
};
