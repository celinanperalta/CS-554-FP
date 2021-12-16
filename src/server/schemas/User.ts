import { Field, ID, ObjectType} from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  username ?: string

  @Field({ nullable: true })
  email ?: string

  @Field({ nullable: true })
  password ?: string

  @Field(() => [String], { nullable: true })
  prompts ?: string[]

  @Field({ nullable: true })
  accessToken ?: string

  @Field({ nullable: true })
  refreshToken ?: string

  @Field({ nullable: true })
  profile_picture ?: string

  @Field(() => [String], { nullable: true })
  likes ?: string[]

  @Field(() => [String], { nullable: true })
  votes ?: string[]

  @Field(() => [String], { nullable: true })
  submissions ?: string[]

  @Field(()=> [String], { nullable: true })
  comments ?: string[]
}
