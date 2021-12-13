import client from "../config/esConnection";
import { Song } from "../schemas/Song";
import {v4 as uuid} from 'uuid';

const getSongs = async () : Promise<Song[]> => {
    const {body} = await client.search({
        index: "songs",
        body: {
            query: {
                match_all: {}
            }
        }
    });
    return body.hits.hits.map(hit => hit._source)
}


const getSongById = async (id: string) : Promise<Song> => {
    const {body} = await client.search({
        index: "songs",
        body: {
            query: {
                match: {
                    id: id
                }
            }
        }
    });
    return body.hits.hits[0]?._source
}

const addSong = async (spotifyId: string, uri: string, name: string, artist: string,  previewUrl: string,  album: string,  imageUrl: string,) : Promise<Song> => {
    let song = new Song()
    song.id = spotifyId
    song.uri=uri
    song.name=name
    song.artist=artist
    song.previewUrl=previewUrl
    song.album=album
    song.imageUrl=imageUrl
    await client.index({
        index: 'songs',
        id: song.id,
        body: song,
        refresh: 'wait_for'
    })
    return song
}


export default {
    getSongs,
    getSongById,
    addSong
}