import { UserLoginContext } from "../config/types";

export const isAuthenticated = (ctx: UserLoginContext): boolean => {
  if (ctx.req.session.passport)
    return ctx.req.session.passport.user !== undefined;
  return false;
};

export const getUserFromContext = (ctx: UserLoginContext): string => {
  return ctx.req.session.passport.user;
};
