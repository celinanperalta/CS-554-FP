/**type Song {
    id: ID!
    spotifyId: String!
    uri: String!
    name: String!
    artist: String!
    previewUrl: String! 
    album: String!
    imageUrl: String!
} */

import { Field, ID, ObjectType} from 'type-graphql';

@ObjectType()
export class Song{
    @Field(() => ID)
    id: string

    @Field()
    spotifyId: string

    @Field()
    uri: string

    @Field()
    name: string

    @Field()
    artist: string

    @Field()
    previewUrl: string

    @Field()
    album: string

    @Field()
    imageUrl: string

}
