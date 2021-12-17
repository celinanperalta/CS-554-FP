import { PassportSubscriptionContext, PassportContext } from 'graphql-passport';
import { Field } from 'type-graphql';
import { User } from '../schemas/User';
import { Song ,SongInput} from '../schemas/Song';

export type UserLogin = {
    username: string;
    password: string;
}

export interface userPatch  {
    id: string,
    username?: string,
    email?: string,
    password?: string,
    prompts?: string[],
    accessToken?: string,
    refreshToken?: string,
    profile_picture?: string,
    likes?: string[],
    votes?: string[],
    submissions?: string[],
    comments?: string[],
}

export interface promptPatch {
    id: string,
    comments?: string[],
    posted_by?: string,
    prompt?: string,
    submittedSongs?: string[]
    datePosted?: Date
    dateCloses?: Date
    isClosed?: boolean
}

export interface commentPatch {
    id: string,
    prompt_id: string,
    comment?: string,
    posted_by?: string,
    likes? : string[]
}

export interface songSubmissionPatch {
    id: string, 
    prompt_id: string,
    song: SongInput,
    submitted_by: string,
    votes?: string[]
}

export interface UserLoginContext extends PassportContext<User, UserLogin>{
  req: any;
  res: any;
}