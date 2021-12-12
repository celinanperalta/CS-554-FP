import { Field, ID, ObjectType} from 'type-graphql';
@ObjectType()
export class SongSubmission {
  @Field(() => ID)
  id: string

  @Field()
  prompt_id: string

  @Field()
  song: string

  @Field()
  submitted_by: string

  @Field(() => [String])
  votes: string[]
}
