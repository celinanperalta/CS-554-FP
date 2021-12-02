import { gql } from "@apollo/client";

const LOGIN_USER = gql`
mutation Login($password: String!, $username: String!) {
  login(password: $password, username: $username) {
    id
    username
    email
    password
    prompts
    accessToken
    refreshToken
    profile_picture
    likes
    votes
    submissions
  }
}
`;

const REGISTER_USER = gql`
mutation registerUser($password: String!, $email: String!, $username: String!) {
  register(password: $password, email: $email, username: $username) {
    id
    username
    email
    password
    prompts
    accessToken
    refreshToken
    profile_picture
    likes
    votes
    submissions
  }
}
`;

const GET_ME = gql`
query Me {
  me {
    id
    username
    password
    email
  }
}
`;

export default {
  LOGIN_USER,
  REGISTER_USER,
  GET_ME
}