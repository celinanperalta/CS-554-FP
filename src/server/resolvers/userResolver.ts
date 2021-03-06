import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql'
import { User } from '../schemas/User'
import userService from '../services/userService'
import { UserLoginContext} from "../config/types";
import { isAuthenticated ,getUserFromContext} from "../util/authUtil";
const bcrypt = require("bcrypt");

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
        try{
        return await userService.addUser(username,email,hashedPassword);
        }catch(e){
            console.log(e);
          }
    }

    @Mutation(returns => User, {nullable: true})
    async updateUser(@Arg("id")id: string,
    @Ctx() ctx: UserLoginContext,
    @Arg("username", {nullable:true})username?: string,
    @Arg("email", {nullable:true})email?: string,
    @Arg("password", {nullable:true})password?: string,
    @Arg("prompts", (type)=>[String], {nullable:true})prompts?: string[],
    @Arg("accessToken", {nullable:true})accessToken?: string,
    @Arg("refreshToken", {nullable:true})refreshToken?: string,
    @Arg("profile_picture", {nullable:true})profile_picture?: string,
    @Arg("likes", (type)=>[String], {nullable:true})likes?: string[],
    @Arg("votes", (type)=>[String], {nullable:true})votes?: string[],
    @Arg("submissions", (type)=>[String], {nullable:true}) submissions?: string[],
    @Arg("comments", (type)=>[String], {nullable:true}) comments?: string[],
    ) : Promise<User>{
        if(!isAuthenticated(ctx) || getUserFromContext(ctx)!==id){throw "Error: must be authenticated/can't update another user"}
        const hashedPassword = password? await bcrypt.hash(password, 10) : undefined;
        try{
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
        });}
        catch(e){
            console.log(e);
          }
    }

    @Mutation(returns => User, {nullable: true})
    async deleteUser(@Arg("id") id: string, @Ctx() ctx: UserLoginContext){
        if(!isAuthenticated(ctx) || getUserFromContext(ctx)!==id){throw "Error can't delete user"}
        try{
        return await userService.deleteUser(id);
        }catch(e){
            console.log(e);
          }
    }
}