import { Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Comment {
    @Field()
    id: string

    @Field()
    prompt_id: string

    @Field()
    comment: string

    @Field()
    posted_by: string

    @Field(() => [String])
    likes: string[]
}

