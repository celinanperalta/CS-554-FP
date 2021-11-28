import { Field, ObjectType, InputType } from 'type-graphql'

@ObjectType()
export class Todo {
  @Field()
  id: number

  @Field()
  title: string

  @Field()
  description: string

  @Field()
  status: boolean
}

@InputType()
export class TodoInput implements Partial<Todo> {
  @Field()
  title: string

  @Field()
  description: string
}
