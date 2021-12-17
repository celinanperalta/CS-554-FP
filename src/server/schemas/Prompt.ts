import { Field, ID, InputType, ObjectType} from 'type-graphql';
import { SongSubmission } from './SongSubmission';
import { User } from './User';
import { Comment } from './Comment';

@ObjectType()
export class Prompt {
    @Field(() => ID)
    id: string;

    @Field({ nullable: true })
    prompt?: string;

    @Field({ nullable: true })
    posted_by?: string

    @Field(() => [String], { nullable: true })
    submittedSongs?: string[];

    @Field(() => [String], { nullable: true })
    comments ?: string[];

    @Field(() => Date, { nullable: true })
    datePosted ?: Date

    @Field(() => Date, { nullable: true })
    dateCloses ?: Date

    @Field({ nullable: true })
    isClosed ?: boolean
}

@InputType()
export class PromptInput {
    @Field()
    prompt: string;

    @Field(() => Date)
    dateCloses: Date;
}
