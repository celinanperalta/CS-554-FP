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
import initPassport from "./config/initPassport";
import { emitWarning } from "process";

const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");

const corsOptions = {
  origin: ['http://localhost:4000'],
  credentials: true,
};

const SESSION_SECRET = "bad secret";
const PORT = 4000;

async function main() {
  require("dotenv").config();

  const schema = await buildSchema({
    resolvers: [SongResolver, UserResolver, AuthResolver],
    emitSchemaFile: true,
  });

  initPassport();

  const app = Express();

  app.use(cors(corsOptions));

  app.use(
    session({
      genid: (req: any) => uuid(),
      secret: SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      scope: ['user-read-email', 'user-read-private'],
      showDialog: false,
    })
  );

  app.get(
    "/auth/spotify/callback",
    passport.authenticate("spotify", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log(req.user);
      res.redirect("/");
    }
  );

  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => buildContext({ req, res, User }),
  });

  await server.start();

  server.applyMiddleware({ app, cors: false });

  await seed();

  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}/graphql`)
  );
}

main();
