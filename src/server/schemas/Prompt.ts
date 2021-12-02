import { Field, ID, ObjectType} from 'type-graphql';
import { SongSubmission } from './SongSubmission';
import { User } from './User';
// {
//     id: String!
//     prompt: String!
//     posted_by: User
//     submittedSongs: [SongSubmission]
//     comments: [Comment]
// }

export class Prompt {
    @Field(() => ID)
    id: string;

    @Field()
    prompt: string;

    @Field()
    posted_by: User

    @Field(() => [String])
    submittedSongs: string[];

    @Field(() => [String])
    comments: string[];
}