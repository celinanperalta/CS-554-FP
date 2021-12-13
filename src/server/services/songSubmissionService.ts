import client from "../config/esConnection";
import { Song, SongInput } from "../schemas/Song";
import { SongSubmission } from "../schemas/SongSubmission";
import { User } from "../schemas/User";
import {v4 as uuid} from 'uuid';
import { songSubmissionPatch } from "../config/types";
import userService from "./userService";
import promptService from "./promptService";
import songService from "./songService";


const getSongSubmissions = async () : Promise<SongSubmission[]> => {
    const {body} = await client.search({
        index: "songsubmissions",
        body: {
            query: {
                match_all: {}
            }
        }
    });
    return body.hits.hits.map(hit => hit._source)
}

const getSongSubmissionById = async (id: string) : Promise<SongSubmission> => {
    const {body} = await client.search({
        index: "songsubmissions",
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

const addSongSubmission = async ( prompt_id: string,  song: SongInput, submitted_by: string) : Promise<SongSubmission> => {
    let songSubmission = new SongSubmission()
    songSubmission.id = uuid()
    songSubmission.song = song
    songSubmission.submitted_by = submitted_by
    songSubmission.votes = []
    songSubmission.prompt_id = prompt_id

    
    let searchResult = await songService.getSongById(song.id);
    console.log(searchResult);
    if(!searchResult){
        await songService.addSong(song.id,song.uri,song.name,song.artist, song.previewUrl, song.album, song.imageUrl)
    }

    await client.index({
        refresh:'wait_for',
        index: 'songsubmissions',
        id: songSubmission.id,
        body: songSubmission,
    })

    //update prompts song sub id array to hold this as well
    let prompt = await promptService.getPromptById(prompt_id);
    prompt.submittedSongs = [...prompt.submittedSongs,songSubmission.id];
    await promptService.updatePrompt(prompt);

    //updating user's songsub id array to hold this as well
    let user = await userService.getUserById(submitted_by);
    user.submissions = [...user.submissions, songSubmission.id];
    console.log(user.submissions);
    await userService.updateUser(user);

    return songSubmission;
}

const updateSongSubmission = async (newSongSubmissionInfo: songSubmissionPatch) : Promise<SongSubmission> =>{
    if(!newSongSubmissionInfo.id || !newSongSubmissionInfo.submitted_by || !newSongSubmissionInfo.prompt_id){
        throw "Must provide comment ID and submitted_by and prompt ID to update Song submission";
    }
    let oldInfo = await getSongSubmissionById(newSongSubmissionInfo.id);
    let newSongSubmission : SongSubmission = {...oldInfo};

    if(newSongSubmissionInfo.song){newSongSubmission.song=newSongSubmissionInfo.song};
    if(newSongSubmissionInfo.votes){newSongSubmission.votes=newSongSubmissionInfo.votes};

    //if votes are updated, then user must also be updated to match
    if(newSongSubmission.votes !==[]){
        for(let voteId of newSongSubmission.votes){
            if(oldInfo.votes.indexOf(voteId) === -1){//if the old votes does not contain the new comment votesId, then user should be updated
                let user = await userService.getUserById(voteId);
                user.votes = [...user.votes, newSongSubmission.id];
                let updatedUser = await userService.updateUser(user);
                console.log(updatedUser);
            }
        }
    }
    await client.update({
        refresh:'wait_for',
        index: 'songsubmissions',
        id: newSongSubmission.id,
        body: {doc: newSongSubmission},
    });

    return newSongSubmission;
}

const deleteSongSubmission = async (id : string) : Promise<SongSubmission> =>{
    if(!id){
        throw "Must provide id to delete song submisison";
    }
    let songSubmission = await getSongSubmissionById(id);
    let {prompt_id, submitted_by, votes} = songSubmission;
    
    //update prompt attached to it 
    let prompt = await promptService.getPromptById(prompt_id);
    let songSubIndex = prompt.submittedSongs.indexOf(id);
    if(songSubIndex == -1){
        throw "Error: couldn't find song sub id in prompt"
    }
    prompt.submittedSongs.splice(songSubIndex,1);
    let updatedPrompt = await promptService.updatePrompt(prompt);
    console.log(updatedPrompt);

    //update user attached to it 
    let user = await userService.getUserById(submitted_by);
    let userSongSubIndex = user.submissions.indexOf(id);
    if(userSongSubIndex == -1){
        throw "Error: couldn't find song sub id in user";
    }
    user.submissions.splice(userSongSubIndex,1);
    let updatedUser = await userService.updateUser(user);
    console.log(updatedUser);

    //update each user that voted on this submisison
    for(let voteId of votes){
        let userToBeUpdated = await userService.getUserById(voteId);
        let usersSongSubIndex = userToBeUpdated.votes.indexOf(id);
        if(usersSongSubIndex === -1){
            throw "Error: couldn't find song sub id in user that voted on it"
        }
        userToBeUpdated.votes.splice(usersSongSubIndex,1);
        let updatedUserThatVoted = await userService.updateUser(userToBeUpdated);
        console.log(updatedUserThatVoted);
    }

    await client.delete({
        refresh:'wait_for',
        id:id,
        index:'songsubmissions'
    });

    return songSubmission;
}

export default {
    getSongSubmissions,
    getSongSubmissionById,
    addSongSubmission,
    updateSongSubmission,
    deleteSongSubmission
}