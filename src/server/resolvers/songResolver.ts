import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { UserLoginContext } from "../config/types";
import { Song } from "../schemas/Song";
import songService from "../services/songService";
import spotifyService from "../services/spotifyService";
import userService from "../services/userService";

@Resolver((of) => Song)
export class SongResolver {
  //uses https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-search.html to search in the es-server
  // use the "match_all": {} to get all documents (in this case songs) that are in the index "songs"
  @Query((returns) => [Song], { nullable: true })
  async getSongs(): Promise<Song[]> {
    return await songService.getSongs();
  }

  @Query((returns) => Song, { nullable: true })
  async getSongById(@Arg("id") id: string): Promise<Song> {
    return await songService.getSongById(id);
  }

  //uses https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/16.x/api-create.html to create in the es-server
  @Mutation((returns) => Song)
  async addSong(
    @Arg("id") id: string,
    @Arg("uri") uri: string,
    @Arg("name") name: string,
    @Arg("artist") artist: string,
    @Arg("previewUrl") previewUrl: string,
    @Arg("album") album: string,
    @Arg("imageUrl") imageUrl: string
  ): Promise<Song> {
    return await songService.addSong(
      id,
      uri,
      name,
      artist,
      previewUrl,
      album,
      imageUrl
    );
  }

  @Query((returns) => [Song], { nullable: true })
  async searchSongs(
    @Arg("query") query: string,
    @Arg("page") page: number,
    @Ctx() ctx: UserLoginContext
  ): Promise<Song[]> {
    if (ctx.req.session.passport?.user) {
      const user = await userService.getUserById(ctx.req.session.passport.user);
      if (user.accessToken) {
        const data = await spotifyService.searchSongs(
          query,
          user.accessToken,
          page
        );
        return data;
      }
    }
    return [];
  }
}
