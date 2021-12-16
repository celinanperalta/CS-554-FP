import { GraphQLLocalStrategy } from "graphql-passport";
import { User } from "../schemas/User";
import userService from "../services/userService";
import * as passport from "passport";

const bcrypt = require("bcrypt");
import { Strategy } from "passport-spotify";
import { userPatch } from "./types";

const spotifyCallback = async (
  req,
  accessToken,
  refreshToken,
  expires_in,
  profile,
  done
) => {
  if (req.session.passport?.user) {
    const user: User = await userService.getUserById(req.session.passport.user);

    if (user) {
      // To do: Ensure user is authenticated with email/password before spotify authentication.
      const updatedUserInto: userPatch = {
        ...user,
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile_picture: profile.photos[0].value,
      };
      const updatedUser = await userService.updateUser(updatedUserInto);
      done(null, updatedUser);
      return;
    }
  } else {
    done(new Error("User not found."), false);
  }
};

const initPassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

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
  passport.serializeUser(function (user: User, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    const user = await userService.getUserById(id);
    done(null, user);
  });

  passport.use(
    new Strategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/spotify/callback",
        passReqToCallback: true,
        showDialog: true,
      },
      spotifyCallback
    )
  );
};

export default initPassport;
