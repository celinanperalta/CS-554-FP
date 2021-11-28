import { Field, ObjectType} from 'type-graphql';

@ObjectType()
export class SongSubmission {
  @Field()
  id: string

  @Field()
  prompt_id: string

  @Field()
  song: string

  @Field()
  submitted_by: boolean

  @Field()
  votes: number
}
