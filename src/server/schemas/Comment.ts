import { Field, ObjectType} from 'type-graphql';

@ObjectType()
export class Comment {
    @Field()
    id: string

    @Field({ nullable: true })
    prompt_id ?: string

    @Field({ nullable: true })
    comment ?: string

    @Field({ nullable: true })
    posted_by ?: string

    @Field(() => [String], { nullable: true })
    likes ?: string[]
}
