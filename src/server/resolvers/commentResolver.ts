import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/User'
import { Comment } from '../schemas/Comment'
import commentService from '../services/commentService'

@Resolver(of => Comment) 
export class CommentResolver {

    @Query(returns => [Comment], { nullable: true })
    async getComments(): Promise<Comment[]> {
        return await commentService.getComments();
    }

    @Query(returns => Comment, {nullable: true})
    async getCommentById(
        @Arg('id') id: string
        ): Promise<Comment> {
            return await commentService.getCommentById(id);
    }

    @Mutation(returns => Comment, {nullable:true})
    async addComment(@Arg("prompt_id")prompt_id: string , @Arg("comment")comment: string,  @Arg("posted_by")posted_by: User,  @Arg("likes")likes: number): Promise<Comment>{
        return await commentService.addComment(prompt_id,comment,posted_by,likes);
    }

}