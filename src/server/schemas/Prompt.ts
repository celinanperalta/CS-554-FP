import { Field, ObjectType} from 'type-graphql';
import { SongSubmission } from './SongSubmission';

// {
//     id: String!
//     prompt: String!
//     posted_by: User
//     submittedSongs: [SongSubmission]
//     comments: [Comment]
// }

export class Prompt {
    @Field()
    id: string;

    @Field()
    prompt: string;

    @Field({ description: "Array of SongSubmission IDs" })
    submittedSongs: string[];

    @Field({ description: "Array of Comment IDs" })
    comments: string[];
}