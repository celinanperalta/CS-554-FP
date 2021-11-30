import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import {Song} from '../schemas/Song';
import {Client} from '@elastic/elasticsearch';

@Resolver(of => Song)
export class SongResolver {
        //uses https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-search.html to search in the es-server
        // use the "match_all": {} to get all documents (in this case songs) that are in the index "songs"
      @Query(returns => [Song], { nullable: true })
      async getSongs(): Promise<Song[]> {

        try{
        var client = new Client({
            node: {url: new URL("http://localhost:9200")}
        });

        let searchResult = await client.search({
            index: "songs",
            body: {
                "query": {
                    "match_all": {}
                }
            }
        })
        console.log(searchResult);
        let hits = searchResult.body.hits.hits;

        let songsArr = new Array();
        for(let hit of hits){
            songsArr.push(hit._source);
        }

        return songsArr;

        }catch(e){
            console.log(e);
            return undefined;
        }
      }
    
      //uses https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-create.html to create in the es-server
      @Mutation(returns => Song)
      async addSong(
        @Arg("id") id: string,
        @Arg("spotifyId") spotifyId: string,
        @Arg("uri") uri: string,
        @Arg("name") name: string,
        @Arg("artist") artist: string,
        @Arg("previewUrl") previewUrl: string,
        @Arg("album") album: string,
        @Arg("imageUrl") imageUrl: string,
                ) : Promise<Song>{
        
        var client = new Client({
            node: {url: new URL("http://localhost:9200")}
        });
        console.log(id);

        let song = {
            id: id,
            spotifyId: spotifyId,
            uri: uri,
            name: name,
            artist: artist,
            previewUrl: previewUrl,
            album: album,
            imageUrl: imageUrl
          }

        try{//create client to then send to elastic-server must start es-server with .\bin\elasticsearch.bat
        let res = await client.create({
            index: 'songs',
            type: '_doc',
            id: id,
            body: song
          });

        return song;
        }
        catch(e){
            console.log(e);
            return undefined;
        }

      }
    }