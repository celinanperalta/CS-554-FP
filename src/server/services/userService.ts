import client from "../config/esConnection";
import { User } from "../schemas/User";
import { v4 as uuid } from "uuid";
import { userPatch } from "../config/types";

const getUsers = async (): Promise<User[]> => {
  const { body } = await client.search({
    index: "users",
    body: {
      query: {
        match_all: {},
      },
    },
  });
  return body.hits.hits.map((hit) => hit._source);
};

const getUserById = async (id: string): Promise<User> => {
  const { body } = await client.search({
    index: "users",
    body: {
      query: {
        match: {
          id: id,
        },
      },
    },
  });
  return body.hits.hits[0]._source;
};

const addUser = async (
  username: string,
  email: string,
  hashedPassword: string
): Promise<User> => {
  let user = new User();
  user.id = uuid();
  user.username = username;
  user.email = email;
  user.password = hashedPassword;
  user.prompts = [];
  user.accessToken = "";
  user.refreshToken = "";
  user.profile_picture = "";
  user.likes = [];
  user.votes = [];
  user.submissions = [];
  user.comments = [];
  await client.index({
    index: "users",
    id: user.id,
    body: user,
  });
  return user;
};



const updateUser = async (newUserInfo: userPatch): Promise<User> => {
    if(!newUserInfo.id){
        throw "Must provide ID to update user";
    }
    let oldUser = await getUserById(newUserInfo.id);
    let newUser : User= {...oldUser};
    if(newUserInfo.username){newUser.username=newUserInfo.username};
    if(newUserInfo.email){newUser.email=newUserInfo.email};
    if(newUserInfo.password){newUser.password=newUserInfo.password};
    if(newUserInfo.prompts){newUser.prompts=newUserInfo.prompts};
    if(newUserInfo.accessToken){newUser.accessToken=newUserInfo.accessToken};
    if(newUserInfo.refreshToken){newUser.refreshToken=newUserInfo.refreshToken};
    if(newUserInfo.profile_picture){newUser.profile_picture=newUserInfo.profile_picture};
    if(newUserInfo.likes){newUser.likes=newUserInfo.likes};
    if(newUserInfo.votes){newUser.votes=newUserInfo.votes};
    if(newUserInfo.submissions){newUser.submissions=newUserInfo.submissions};
    if(newUserInfo.comments){newUser.comments=newUserInfo.comments};
    console.log(newUser);
    await client.update({
        index: 'users',
        id: newUser.id,
        body: {doc:newUser}
    });
    return newUser;

};

const updateUser = async (newUser: User, user: User) : Promise<User> => {
    await client.update({
        index: 'users',
        id: user.id,
        body: {
            doc: newUser
        }
    })
    return newUser
}

export default {
  getUsers,
  getUserById,
  addUser,
  updateUser
};

