import client from "../config/esConnection";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { Song } from "../schemas/Song";

const SPOTIFY_ENDPOINT = "https://api.spotify.com/v1/";

const toSong = (song: any): Song => {
  return {
    id: uuid(),
    spotifyId: song.id,
    uri: song.uri,
    name: song.name,
    artist: song.artists[0].name,
    previewUrl: song.preview_url || "",
    album: song.album.name,
    imageUrl: song.album.images[0]?.url || "",
  };
};

let exportedMethods = {
  // Todo: figure out how to get the access token like last time
  async getSong(songId: string, token: string) {
    const response = await axios({
      method: "get",
      url: `${SPOTIFY_ENDPOINT}tracks/${songId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  async searchSongs(
    query: string,
    token: string,
    page: number = 0,
  ): Promise<Song[]> {
    console.log(`Song service: searching for ${query}`);
    const response = await axios({
      method: "get",
      url: `${SPOTIFY_ENDPOINT}search`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 20,
        offset: page * 20,
        query: query,
        type: "track",
      },
    });
    console.log(response.data);
    return response.data.tracks.items.map(toSong);
  },
};

export default exportedMethods;
