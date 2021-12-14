import { Field, ObjectType} from 'type-graphql';


@ObjectType()
export class Auth {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string
}