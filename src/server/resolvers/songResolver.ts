import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import {Song} from '../schemas/Song';
import songService from "../services/songService";

@Resolver(of => Song)
export class SongResolver {
        //uses https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-search.html to search in the es-server
        // use the "match_all": {} to get all documents (in this case songs) that are in the index "songs"
      @Query(returns => [Song], { nullable: true })
      async getSongs(): Promise<Song[]> {
        return await songService.getSongs();
      }

      @Query(returns => Song, { nullable: true })
      async getSongById(@Arg("id") id: string): Promise<Song> {
        return await songService.getSongById(id);
      }

      @Query(returns => Song, { nullable: true })
      async getSongBySpotifyId(@Arg("spotifyId") spotifyId: string): Promise<Song> {
        return await songService.getSongBySpotifyId(spotifyId);
      }

      //uses https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-create.html to create in the es-server
      @Mutation(returns => Song)
      async addSong(
        @Arg("spotifyId") spotifyId: string,
        @Arg("uri") uri: string,
        @Arg("name") name: string,
        @Arg("artist") artist: string,
        @Arg("previewUrl") previewUrl: string,
        @Arg("album") album: string,
        @Arg("imageUrl") imageUrl: string,
                ) : Promise<Song>{
        
        return await songService.addSong(spotifyId,uri,name,artist,previewUrl,album,imageUrl);
      }


    }


    