import { Field, ID, ObjectType} from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  username?: string

  @Field()
  email?: string

  @Field()
  password: string

  @Field(() => [String])
  prompts?: string[]
  
  @Field()
  accessToken?: string

  @Field()
  refreshToken?: string

  @Field()
  profile_picture?: string

  @Field(() => [String])
  likes?: string[]

  @Field(() => [String])
  votes?: string[]

  @Field(() => [String])
  submissions?: string[]

  @Field(()=> [String])
  comments?: string[]
}
