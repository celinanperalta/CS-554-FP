import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/User'
import client from '../config/esConnection'
import { v4 as uuid } from 'uuid'
import userService from '../services/userService'
import bcrypt from 'bcrypt'

@Resolver(of => User) 
export class UserResolver {

    @Query(returns => [User], { nullable: true })
    async getUsers(): Promise<User[]> {
        return await userService.getUsers()
    }

    @Query(returns => User, {nullable: true})
    async getUser(
        @Arg('id') id: string
        ): Promise<User> {
            return await userService.getUserById(id)
    }

}