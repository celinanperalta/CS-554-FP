import { Context } from "apollo-server-core";
import { Query, Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { PassportContext } from "graphql-passport";
import client from "../config/esConnection";
import { Auth } from "../schemas/Auth";
import { User } from "../schemas/User";
import { UserLoginContext } from "../config/types";
import userService from "../services/userService";
const bcrypt = require("bcrypt");

// https://jkettmann.com/password-based-authentication-with-graphql-and-passport
@Resolver((of) => Auth)
export class AuthResolver {
  @Query((returns) => User, {nullable: true})
  async me(@Ctx() ctx: UserLoginContext): Promise<User> {
    console.log('ctx req user', ctx.req.user);
    return ctx.req.user as User;
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
    ctx.res.cookie("user", user.id, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
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
    console.log('logout before', ctx.isAuthenticated());
    await ctx.logout();
    console.log('logout after', ctx.isAuthenticated());
    ctx.res.clearCookie("user");
    return true;
  }
}
