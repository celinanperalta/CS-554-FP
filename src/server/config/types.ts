import { PassportSubscriptionContext, PassportContext } from 'graphql-passport';
import { User } from '../schemas/User';

export type UserLogin = {
    username: string;
    password: string;
}

export interface UserLoginContext extends PassportContext<User, UserLogin>{}