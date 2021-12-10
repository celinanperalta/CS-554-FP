import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { v4 as uuid } from "uuid";
import { buildContext } from "graphql-passport";

import { SongResolver } from "./resolvers/songResolver";
import { UserResolver } from "./resolvers/userResolver";
import { AuthResolver } from "./resolvers/authResolver";
import { CommentResolver } from "./resolvers/commentResolver";
import { PromptResolver } from "./resolvers/promptResolver";
import { SongSubmissionResolver } from "./resolvers/songSubmissionResolver";

import { User } from "./schemas/User";

import { seed } from "./config/esConnection";
import initPassport from "./config/initPassport";
import * as passport from "passport";

const cors = require("cors");
const bcrypt = require("bcrypt");
const session = require("express-session");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://studio.apollographql.com",
    "http://localhost:4000",
    "https://accounts.spotify.com/authorize",
  ],
  credentials: true,
};

const SESSION_SECRET = "bad secret";
const PORT = 4000;

async function main() {
  require("dotenv").config();

  const schema = await buildSchema({
    resolvers: [
      SongResolver,
      UserResolver,
      AuthResolver,
      CommentResolver,
      PromptResolver,
      SongSubmissionResolver,
    ],
    emitSchemaFile: true,
  });

  const app = Express();

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );

    next();
  });

  app.use(cors(corsOptions));

  app.use(
    session({
      genid: (req) => uuid(),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );

  initPassport(app);

  app.get(
    "/auth/spotify",
    passport.authenticate("spotify", {
      scope: ["user-read-email", "user-read-private"],
    })
  );

  app.get(
    "/auth/spotify/callback",
    passport.authenticate("spotify", {
      failureRedirect: "http://localhost:3000/",
    }),
    function (req, res) {
      // Successful authentication, redirect home.
      console.log(req.user);
      res.redirect("http://localhost:3000/users/me");
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
