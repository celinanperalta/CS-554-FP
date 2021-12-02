import { Field, ID, ObjectType} from 'type-graphql';
import { SongSubmission } from './SongSubmission';
import { User } from './User';
import { Comment } from './Comment';
// {
//     id: String!
//     prompt: String!
//     posted_by: User
//     submittedSongs: [SongSubmission]
//     comments: [Comment]
// }
@ObjectType()
export class Prompt {
    @Field(() => ID)
    id: string;

    @Field()
    prompt: string;

    @Field()
    posted_by: string

    @Field(() => [String])
    submittedSongs: string[];

    @Field(() => [String])
    comments: string[];
}