import { Field, ObjectType} from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  username: string

  @Field()
  email: string

  @Field()
  password: boolean

  @Field({ description: "Array of Prompt IDs" })
  prompts: string[]
  
  @Field()
  accessToken: string

  @Field()
  refreshToken: string

  @Field()
  profile_picture: string

  @Field({ description: "Array of Comment IDs"})
  likes: string[]

  @Field({ description: "Array of Prompt IDs"})
  votes: string[]

  @Field({ description: "Array of SongSubmission IDs"} )
  submissions: string[]
}
