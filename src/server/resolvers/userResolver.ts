import { Query, Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../schemas/User'
import userService from '../services/userService'
@Resolver(of => User) 
export class UserResolver {

    @Query(returns => [User], { nullable: true })
    async getUsers(): Promise<User[]> {
        return await userService.getUsers()
    }

    @Query(returns => User, {nullable: true})
    async getUserById(
        @Arg('id') id: string
        ): Promise<User> {
            return await userService.getUserById(id)
    }

    @Mutation(returns => User, {nullable:true})
    async addUser(@Arg('username')username: string, @Arg('email') email: string, @Arg('hashedPassword')hashedPassword: string): Promise<User>{
        return await userService.addUser(username,email,hashedPassword);
    }

}