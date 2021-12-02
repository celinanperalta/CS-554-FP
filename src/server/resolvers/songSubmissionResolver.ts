import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/User'
import { Song } from '../schemas/Song';
import { SongSubmission } from '../schemas/SongSubmission';
import songSubmissionService from '../services/songSubmissionService';

@Resolver(of => SongSubmission) 
export class SongSubmissionResolver {

    @Query(returns => [SongSubmission], { nullable: true })
    async getComments(): Promise<SongSubmission[]> {
        return await songSubmissionService.getSongSubmissions();
    }

    @Query(returns => SongSubmission, {nullable: true})
    async getPromptById(
        @Arg('id') id: string
        ): Promise<SongSubmission> {
            return await songSubmissionService.getSongSubmissionById(id);
    }

    @Mutation(returns => SongSubmission, {nullable:true})
    async addPrompt(@Arg('prompt') prompt_id: string, @Arg('song') song: Song,  @Arg('submitted_by') submitted_by: User, @Arg('votes')votes: number): Promise<SongSubmission>{
        return await songSubmissionService.addSongSubmission(prompt_id,song,submitted_by,votes);
    }

}