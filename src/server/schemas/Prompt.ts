import { Field, ID, InputType, ObjectType} from 'type-graphql';
import { SongSubmission } from './SongSubmission';
import { User } from './User';
import { Comment } from './Comment';

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

    @Field(() => Date)
    datePosted: Date

    @Field(() => Date)
    dateCloses: Date

    @Field()
    isClosed: boolean
}

@InputType()
export class PromptInput {
    @Field()
    prompt: string;

    @Field(() => Date)
    dateCloses: Date;
}
