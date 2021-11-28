import { Field, ObjectType} from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Comment {
    @Field()
    id: string

    @Field()
    prompt_id: string

    @Field()
    comment: string

    @Field()
    posted_by: User

    @Field()
    likes: number
}

