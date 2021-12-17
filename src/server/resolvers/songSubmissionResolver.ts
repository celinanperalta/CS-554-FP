import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { SongSubmission } from "../schemas/SongSubmission";
import songSubmissionService from "../services/songSubmissionService";
import { SongInput } from "../schemas/Song";
import { UserLoginContext } from "../config/types";
import { isAuthenticated, getUserFromContext } from "../util/authUtil";
import promptService from "../services/promptService";

@Resolver((of) => SongSubmission)
export class SongSubmissionResolver {
  @Query((returns) => [SongSubmission], { nullable: true })
  async getSongSubmissions(): Promise<SongSubmission[]> {
    return await songSubmissionService.getSongSubmissions();
  }

  @Query((returns) => SongSubmission, { nullable: true })
  async getSongSubmissionById(@Arg("id") id: string): Promise<SongSubmission> {
    return await songSubmissionService.getSongSubmissionById(id);
  }

  @Mutation((returns) => SongSubmission, { nullable: true })
  async addSongSubmission(
    @Arg("prompt_id") prompt_id: string,
    @Arg("song", (type) => SongInput) song: SongInput,
    @Ctx() ctx: UserLoginContext
  ): Promise<SongSubmission> {
    if (!isAuthenticated(ctx)) {
      throw "Must Authenticate to add song sub";
    }
    try{
    return await songSubmissionService.addSongSubmission(
      prompt_id,
      song,
      getUserFromContext(ctx)
    );
    }catch(e){
      console.log(e);
    }
  }

  @Mutation((returns) => SongSubmission, { nullable: true })
  async updateSongSubmission(
    @Arg("id") id: string,
    @Arg("prompt_id") prompt_id: string,
    @Arg("song", (type) => SongInput, { nullable: true }) song: SongInput,
    @Arg("submitted_by") submitted_by: string,
    @Arg("votes", (type) => [String], { nullable: true }) votes: string[],
    @Ctx() ctx: UserLoginContext
  ): Promise<SongSubmission> {
    if (!isAuthenticated(ctx) || getUserFromContext(ctx) !== submitted_by) {
      throw "Error: must authenticate/can't update another users song sub";
    }
    try{
    return await songSubmissionService.updateSongSubmission({
      id: id,
      prompt_id: prompt_id,
      song: song,
      submitted_by: submitted_by,
      votes: votes,
    });
  }catch(e){
    console.log(e);
  }
  }

  @Mutation((returns) => SongSubmission, { nullable: true })
  async deleteSongSubmission(
    @Arg("id") id: string,
    @Ctx() ctx: UserLoginContext
  ): Promise<SongSubmission> {
    let songSub = await songSubmissionService.getSongSubmissionById(id);
    let prompt = await promptService.getPromptById(songSub.prompt_id);
    if (
      !isAuthenticated(ctx) &&
      getUserFromContext(ctx) !== songSub.submitted_by &&
      getUserFromContext(ctx) !== prompt.posted_by
    ) {
      throw "Can't delete song sub";
    }
    try{
    return await songSubmissionService.deleteSongSubmission(id);
    }catch(e){
      console.log(e);
    }
  }

  @Mutation((returns) => SongSubmission, { nullable: true })
  async voteSongSubmission(
    @Arg("id") id: string,
    @Ctx() ctx: UserLoginContext
  ): Promise<SongSubmission> {
    if (!isAuthenticated(ctx)) {
      throw "Must authenticate to vote";
    }
    try{
    return await songSubmissionService.voteSongSubmission(
      id,
      getUserFromContext(ctx)
    );
    }catch(e){
      console.log(e);
    }
  }

    @Mutation((returns) => SongSubmission, { nullable: true })
    async unvoteSongSubmission(
        @Arg("id") id: string,
        @Ctx() ctx: UserLoginContext
    ): Promise<SongSubmission> {
        if (!isAuthenticated(ctx)) {
            throw "Must authenticate to unvote";
        }
        try{
        return await songSubmissionService.unvoteSongSubmission(
            id,
            getUserFromContext(ctx)
        );
        }catch(e){
          console.log(e);
        }
    }
}
