import client from "../config/esConnection";
import { Song } from "../schemas/Song";
import { SongSubmission } from "../schemas/SongSubmission";
import { User } from "../schemas/User";
import {v4 as uuid} from 'uuid';


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

const addSongSubmission = async ( prompt_id: string,  song: string, submitted_by: string, votes: number) : Promise<SongSubmission> => {
    let songSubmission = new SongSubmission()
    songSubmission.id = uuid()
    songSubmission.song = song
    songSubmission.submitted_by = submitted_by
    songSubmission.votes = votes
    await client.index({
        index: 'songsubmissions',
        id: songSubmission.id,
        body: songSubmission,
    })
    return songSubmission;
}

export default {
    getSongSubmissions,
    getSongSubmissionById,
    addSongSubmission
}