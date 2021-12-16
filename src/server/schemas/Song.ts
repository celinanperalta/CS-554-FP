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

import { Field, ID, InputType, ObjectType} from 'type-graphql';

@ObjectType()
export class Song {
    @Field(() => ID)
    id: string

    @Field({ nullable: true })
    uri ?: string

    @Field({ nullable: true })
    name ?: string

    @Field({ nullable: true })
    artist ?: string

    @Field({ nullable: true })
    previewUrl ?: string

    @Field({ nullable: true })
    album ?: string

    @Field({ nullable: true })
    imageUrl ?: string

}

@InputType()
export class SongInput{
    @Field(() => ID)
    id: string

    @Field({ nullable: true })
    uri ?: string

    @Field({ nullable: true })
    name ?: string

    @Field({ nullable: true })
    artist ?: string

    @Field({ nullable: true })
    previewUrl ?: string

    @Field({ nullable: true })
    album ?: string

    @Field({ nullable: true })
    imageUrl ?: string

}
