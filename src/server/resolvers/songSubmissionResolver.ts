import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { SongSubmission } from '../schemas/SongSubmission';
import songSubmissionService from '../services/songSubmissionService';

@Resolver(of => SongSubmission) 
export class SongSubmissionResolver {

    @Query(returns => [SongSubmission], { nullable: true })
    async getSongSubmissions(): Promise<SongSubmission[]> {
        return await songSubmissionService.getSongSubmissions();
    }

    @Query(returns => SongSubmission, {nullable: true})
    async getSongSubmissionById(
        @Arg('id') id: string
        ): Promise<SongSubmission> {
            return await songSubmissionService.getSongSubmissionById(id);
    }

    @Mutation(returns => SongSubmission, {nullable:true})
    async addSongSubmission(@Arg('prompt') prompt_id: string, @Arg('song') song: string,  @Arg('submitted_by') submitted_by: string, @Arg('votes')votes: number): Promise<SongSubmission>{
        return await songSubmissionService.addSongSubmission(prompt_id,song,submitted_by,votes);
    }

}