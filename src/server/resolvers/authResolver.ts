import { Context } from "apollo-server-core";
import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { PassportContext } from "graphql-passport";
import client from "../config/esConnection";
import { Auth } from "../schemas/Auth";
import { User } from "../schemas/User";
import { UserLoginContext } from "../config/types";
import userService from "../services/userService";
import { isAuthenticated } from "../util/authUtil";
const bcrypt = require("bcrypt");

// https://jkettmann.com/password-based-authentication-with-graphql-and-passport
@Resolver((of) => Auth)
export class AuthResolver {

  @Query((returns) => Boolean)
  async isAuthenticated(@Ctx() ctx: UserLoginContext): Promise<boolean> {
    return isAuthenticated(ctx);
  }

  @Query((returns) => User, {nullable: true})
  async me(@Ctx() ctx: UserLoginContext): Promise<User> {
    if (isAuthenticated(ctx)) {
      return userService.getUserById(ctx.req.session.passport.user);
    }
    return null;
  }

  @Mutation((returns) => User, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() ctx: UserLoginContext
  ): Promise<User> {
    const credentials = {
      username,
      password,
    };
    const { user } = await ctx.authenticate("graphql-local", credentials);
    await ctx.login(user);
    return user;
  }

  @Mutation((returns) => User)
  async register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: UserLoginContext
  ): Promise<User> {
    const existingUsers = await userService.getUsers();
    const existingUser = existingUsers.find(
      (user) => user.username === username
    );
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.addUser(username, email, hashedPassword);
    await ctx.login(user);
    return user;
  }

  @Mutation((returns) => Boolean)
  async logout(@Ctx() ctx: UserLoginContext): Promise<boolean> {
    await ctx.logout();
    return true;
  }
}
