import { GraphQLLocalStrategy } from "graphql-passport";
import { User } from "../schemas/User";
import userService from "../services/userService";

const bcrypt = require("bcrypt");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

const spotifyCallback = async (req, accessToken, refreshToken, expires_in, profile, done) => {
    console.log(profile);
    const users : User[] = await userService.getUsers();
    const matchingUser = users.find(user => user.id === profile.id);

    if (matchingUser) {
      done(null, matchingUser);
      return;
    }

    // To do: Ensure user is authenticated with email/password before spotify authentication.
    const dummyUser : User = {
        id: profile._json.uri,
        username: profile.username,
        email: profile.emails[0].value,
        password: "",
        accessToken: accessToken,
        refreshToken: refreshToken,
        prompts: [],
        profile_picture: profile.photos[0].value,
        likes: [],
        votes: [],
        submissions: []
    }


    done(null, dummyUser);
  };

const initPassport = () => {
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
    new SpotifyStrategy(
      {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/spotify/callback",
        passReqToCallback: true
      },
      spotifyCallback
    )
  );
};

export default initPassport;
