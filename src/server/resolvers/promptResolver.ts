import { Query, Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../schemas/User";
import { Prompt } from "../schemas/Prompt";
import { Comment } from "../schemas/Comment";
import promptService from "../services/promptService";

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
    @Arg("posted_by") posted_by: string,
    @Arg("submittedSongs", (type)=>[String]) submittedSongs: string[],
    @Arg("comments", (type) => [String]) comments: string[],
    @Arg("dateCloses") dateCloses: Date
  ): Promise<Prompt> {
    return await promptService.addPrompt(
      prompt,
      posted_by,
      submittedSongs,
      comments,
      dateCloses
    );
  }

  @Mutation((returns) => Prompt, { nullable: true })
  async updatePrompt(@Arg("id") id: string,
  @Arg("prompt", {nullable:true}) prompt: string,
  @Arg("posted_by") posted_by: string,
  @Arg("submittedSongs", (type)=>[String], {nullable:true}) submittedSongs: string[],
  @Arg("comments", (type) => [String], {nullable:true}) comments: string[],
  @Arg("datePosted", (type)=>Date, {nullable:true}) datePosted: Date,
  @Arg("dateCloses", (type)=>Date, {nullable:true}) dateCloses: Date,
  @Arg("isClosed") isClosed: boolean
  ) : Promise<Prompt> {
      return promptService.updatePrompt(
          {id:id,
          posted_by: posted_by,
          submittedSongs: submittedSongs,
          comments: comments,
          prompt: prompt,
          dateCloses: dateCloses,
          datePosted: datePosted,
          isClosed: isClosed
        })
  }
  @Mutation((returns) => Prompt, {nullable:true})
  async deletePrompt(@Arg("id") id: string): Promise<Prompt> {
    return await promptService.deletePrompt(id);
  }
}


