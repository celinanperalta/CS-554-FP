import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/User'
import { Prompt } from '../schemas/Prompt';
import promptService from '../services/promptService';

@Resolver(of => Prompt) 
export class PromptResolver {

    @Query(returns => [Prompt], { nullable: true })
    async getComments(): Promise<Prompt[]> {
        return await promptService.getPrompts();
    }

    @Query(returns => Prompt, {nullable: true})
    async getPromptById(
        @Arg('id') id: string
        ): Promise<Prompt> {
            return await promptService.getPromptById(id);
    }

    @Mutation(returns => Prompt, {nullable:true})
    async addPrompt(@Arg('prompt') prompt: string, @Arg('posted_by') posted_by: User,  @Arg('submittedSongs') submittedSongs: string[], @Arg('comments')comments: string[]): Promise<Prompt>{
        return await promptService.addPrompt(prompt,posted_by,submittedSongs,comments);
    }

}