import { Field, ID, ObjectType} from 'type-graphql';
import { Song } from './Song';
@ObjectType()
export class SongSubmission {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  prompt_id?: string

  @Field(() => Song, { nullable: true })
  song ?: Song

  @Field({ nullable: true })
  submitted_by ?: string

  @Field(() => [String], { nullable: true })
  votes ?: string[]
}
