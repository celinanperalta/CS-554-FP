import client from "../config/esConnection";
import { User } from "../schemas/User";
import {v4 as uuid} from 'uuid';

const getUsers = async () : Promise<User[]> => {
    const {body} = await client.search({
        index: "users",
        body: {
            query: {
                match_all: {}
            }
        }
    });
    return body.hits.hits.map(hit => hit._source)
}

const getUserById = async (id: string) : Promise<User> => {
    const {body} = await client.search({
        index: "users",
        body: {
            query: {
                match: {
                    id: id
                }
            }
        }
    });
    return body.hits.hits[0]._source
}

const addUser = async (username: string, email: string, hashedPassword: string) : Promise<User> => {
    let user = new User()
    user.id = uuid()
    user.username = username
    user.email = email
    user.password = hashedPassword
    user.prompts = []
    user.accessToken = ""
    user.refreshToken = ""
    user.profile_picture = ""
    user.likes = []
    user.votes = []
    user.submissions = []
    await client.index({
        index: 'users',
        id: user.id,
        body: user,
    })
    return user
}

export default {
    getUsers,
    getUserById,
    addUser
}