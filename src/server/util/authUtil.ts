import { UserLoginContext } from "../config/types";

export const isAuthenticated = (ctx: UserLoginContext): boolean => {
  return ctx.req.session.passport.user !== undefined;
};

export const getUserFromContext = (ctx: UserLoginContext): string => {
  return ctx.req.session.passport.user;
};
