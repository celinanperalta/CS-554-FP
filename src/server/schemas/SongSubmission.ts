import { Field, ID, ObjectType} from 'type-graphql';
import { Song } from './Song';
@ObjectType()
export class SongSubmission {
  @Field(() => ID)
  id: string

  @Field()
  prompt_id: string

  @Field(() => Song)
  song: Song

  @Field()
  submitted_by: string

  @Field(() => [String], { nullable: true })
  votes ?: string[]
}
