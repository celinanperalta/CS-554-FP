import client from "../config/esConnection";
import {v4 as uuid} from 'uuid';
import axios from 'axios';

const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1/";

// Todo: figure out how to get the access token like last time
export const getSong = async (songId: string) => {
    const response = await axios({
        method: 'get',
        url: `${SPOTIFY_ENDPOINT}tracks/${songId}`,
        headers: {
            'Authorization': `Bearer ${process.env.SPOTIFY_TOKEN}`
        }
    });
    return response.data;
};
  
