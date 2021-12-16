import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User } from "../schemas/User";
import { Comment } from "../schemas/Comment";
import commentService from "../services/commentService";
import { getUserFromContext, isAuthenticated } from "../util/authUtil";
import { UserLoginContext } from "../config/types";
import promptService from "../services/promptService";

@Resolver((of) => Comment)
export class CommentResolver {
  @Query((returns) => [Comment], { nullable: true })
  async getComments(): Promise<Comment[]> {
    return await commentService.getComments();
  }

  @Query((returns) => Comment, { nullable: true })
  async getCommentById(@Arg("id") id: string): Promise<Comment> {
    return await commentService.getCommentById(id);
  }

  @Mutation((returns) => Comment, { nullable: true })
  async addComment(
    @Arg("prompt_id") prompt_id: string,
    @Arg("comment") comment: string,
    @Ctx() ctx: UserLoginContext
  ): Promise<Comment> {
    if (!isAuthenticated(ctx)){throw "must be authenticated to comment"}
    try{
    return await commentService.addComment(prompt_id, comment, getUserFromContext(ctx));
    }catch(e){
      console.log(e);
    }
  }

  @Mutation((returns) => Comment, { nullable: true })
  async updateComment(
    @Arg("id") id: string,
    @Arg("prompt_id") prompt_id: string,
    @Arg("comment", { nullable: true }) comment: string,
    @Arg("posted_by") posted_by: string,
    @Arg("likes", (type)=>[String],{ nullable: true }) likes: string[],
    @Ctx() ctx: UserLoginContext
  ): Promise<Comment> {
    // check if user is authorized to update comment
    if(!isAuthenticated(ctx) || getUserFromContext(ctx)!==posted_by){throw "Error, must authenticate/can't update another users comment"}
    try{
    return await commentService.updateComment({
      id: id,
      prompt_id: prompt_id,
      posted_by: posted_by,
      comment: comment,
      likes: likes,
    });}catch(e){
      console.log(e);
    }
    
  }

  @Mutation((returns) => Comment, {nullable:true})
  async deleteComment(
    @Arg("id") id: string,
    @Ctx() ctx: UserLoginContext
  ) : Promise<Comment>{
    let comment = await commentService.getCommentById(id);
    let prompt = await promptService.getPromptById(comment.prompt_id);
    if(!isAuthenticated(ctx) && prompt.posted_by !== getUserFromContext(ctx) && comment.posted_by !== getUserFromContext(ctx)){throw "Error, can't delete comment."}
    try{
    return await commentService.deleteComment(id);
    }catch(e){
      console.log(e);
    }
  }
}
