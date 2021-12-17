import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../schemas/User";
import { Prompt } from "../schemas/Prompt";
import { Comment } from "../schemas/Comment";
import promptService from "../services/promptService";
import { UserLoginContext} from "../config/types";
import { isAuthenticated ,getUserFromContext} from "../util/authUtil";

@Resolver((of) => Prompt)
export class PromptResolver {
  @Query((returns) => [Prompt], { nullable: true })
  async getPrompts(): Promise<Prompt[]> {
    return await promptService.getPrompts();
  }

  @Query((returns) => Prompt, { nullable: true })
  async getPromptById(@Arg("id") id: string): Promise<Prompt> {
    return await promptService.getPromptById(id);
  }

  @Mutation((returns) => Prompt, { nullable: true })
  async addPrompt(
    @Arg("prompt") prompt: string,
    @Arg("dateCloses") dateCloses: Date,
    @Ctx() ctx: UserLoginContext
  ): Promise<Prompt> {
    // Todo: Add auth check to all of these CUD operations
    if(!isAuthenticated(ctx)){throw "Error must authenticate to add prompt"};
    try{
    return await promptService.addPrompt(
      prompt,
      ctx.req.session.passport.user,
      dateCloses
    );
    }catch(e){
      console.log(e);
    }
  }

  @Mutation((returns) => Prompt, { nullable: true })
  async updatePrompt(@Arg("id") id: string,
  @Arg("prompt", {nullable:true}) prompt: string,
  @Arg("posted_by") posted_by: string,
  @Arg("submittedSongs", (type)=>[String], {nullable:true}) submittedSongs: string[],
  @Arg("comments", (type) => [String], {nullable:true}) comments: string[],
  @Arg("datePosted", (type)=>Date, {nullable:true}) datePosted: Date,
  @Arg("dateCloses", (type)=>Date, {nullable:true}) dateCloses: Date,
  @Arg("isClosed") isClosed: boolean,
  @Ctx() ctx: UserLoginContext
  ) : Promise<Prompt> {
      if(!isAuthenticated(ctx) || getUserFromContext(ctx)!==posted_by){throw "Error, must authenticate/can't update another users prompt"}
      try{
      return promptService.updatePrompt(
          {id:id,
          posted_by: posted_by,
          submittedSongs: submittedSongs,
          comments: comments,
          prompt: prompt,
          dateCloses: dateCloses,
          datePosted: datePosted,
          isClosed: isClosed
        })}
        catch(e){
          console.log(e);
        }
  }
  @Mutation((returns) => Prompt, {nullable:true})
  async deletePrompt(@Arg("id") id: string, @Ctx() ctx: UserLoginContext): Promise<Prompt> {
    let prompt = await promptService.getPromptById(id);
    if(!isAuthenticated(ctx) && getUserFromContext(ctx)!==prompt.posted_by){throw "Error, can't delete prompt"}
    try{
    return await promptService.deletePrompt(id);
    }catch(e){
      console.log(e);
    }
  }
}


