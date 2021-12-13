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

    @Mutation(returns => User, {nullable: true})
    async updateUser(@Arg("id")id: string,
    @Arg("username", {nullable:true})username?: string,
    @Arg("email", {nullable:true})email?: string,
    @Arg("hashedPassword", {nullable:true})hashedPassword?: string,
    @Arg("prompts", (type)=>[String], {nullable:true})prompts?: string[],
    @Arg("accessToken", {nullable:true})accessToken?: string,
    @Arg("refreshToken", {nullable:true})refreshToken?: string,
    @Arg("profile_picture", {nullable:true})profile_picture?: string,
    @Arg("likes", (type)=>[String], {nullable:true})likes?: string[],
    @Arg("votes", (type)=>[String], {nullable:true})votes?: string[],
    @Arg("submissions", (type)=>[String], {nullable:true}) submissions?: string[],
    @Arg("comments", (type)=>[String], {nullable:true}) comments?: string[]
    ) : Promise<User>{
        return await userService.updateUser({id: id,
            username: username,
            email: email,
            password: hashedPassword,
            prompts: prompts,
            accessToken: accessToken,
            refreshToken: refreshToken,
            profile_picture: profile_picture,
            likes: likes,
            votes: votes,
            submissions: submissions,
            comments:comments
        });
    }

    @Mutation(returns => User, {nullable: true})
    async deleteUser(@Arg("id") id: string){
        return await userService.deleteUser(id);
    }
}