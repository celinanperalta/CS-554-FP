import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express, * as Express from "express";
import { buildSchema } from "type-graphql";
import { v4 as uuid } from "uuid";
import { GraphQLLocalStrategy, buildContext } from "graphql-passport";

import { SongResolver } from "./resolvers/songResolver";
import { UserResolver } from "./resolvers/userResolver";
import { AuthResolver } from "./resolvers/authResolver";

import { User } from "./schemas/User";

import userService from "./services/userService";
import { seed } from "./config/esConnection";

const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");

async function main() {
  require("dotenv").config();
  const schema = await buildSchema({
    resolvers: [SongResolver, UserResolver, AuthResolver],
    emitSchemaFile: true,
  });

  const SESSION_SECRET = "bad secret";

  passport.serializeUser(function (user: User, done) {
    done(null, user);
  });

  passport.deserializeUser(function (id: string, done) {
    userService.getUserById(id).then((user) => {
      done(null, user);
    });
  });

  passport.use(
    new GraphQLLocalStrategy(
      async (username: string, password: string, done) => {
        const users = await userService.getUsers();
        const matchingUser: User = users.find(
          (user) => username === user.username
        );
        if (!matchingUser) {
          done(new Error(`User ${username} not found.`), false);
        } else {
          const matchPass = await bcrypt.compare(
            password,
            matchingUser.password
          );
          const error = matchPass ? null : new Error("Bad credentials.");
          done(error, matchingUser);
        }
      }
    )
  );

  const app = Express();

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => buildContext({ req, res }),
  });

  app.use(
    session({
      genid: (req) => uuid(),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await server.start();

  server.applyMiddleware({ app });

  await seed();

  app.listen(4000, () =>
    console.log("Server is running on http://localhost:4000/graphql")
  );
}

main();
