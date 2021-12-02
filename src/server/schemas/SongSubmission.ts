import { Field, ID, ObjectType} from 'type-graphql';
import { Song } from './Song';
import { User } from './User';
@ObjectType()
export class SongSubmission {
  @Field(() => ID)
  id: string

  @Field()
  prompt_id: string

  @Field()
  song: Song

  @Field()
  submitted_by: User

  @Field()
  votes: number
}
