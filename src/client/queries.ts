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
  mutation registerUser(
    $password: String!
    $email: String!
    $username: String!
  ) {
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
      email
    }
  }
`;

const IS_AUTHENTICATED = gql`
  query Query {
    isAuthenticated
  }
`;

const LOGOUT_USER = gql`
  mutation Mutation {
    logout
  }
`;

const GET_USER = gql`
query Query($id: String!) {
  getUserById(id: $id) {
    id
    username
    email
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

const GET_PROMPTS = gql`
query Query {
  getPrompts {
    comments
    posted_by
    id
    prompt
    isClosed
    dateCloses
    datePosted
    submittedSongs
  }
}
`
const GET_PROMPT = gql`
  query GetPromptById($promptId: String!) {
    getPromptById(id: $promptId) {
      id
      posted_by
      dateCloses
      datePosted
      isClosed
      prompt
      submittedSongs
      comments
  }
}

`

const GET_COMMENT = gql`
query GetCommentById($commentId: String!) {
  getCommentById(id: $commentId) {
    id
    likes
    posted_by
    comment
    prompt_id
  }
}

`

const GET_SONG_SUB = gql`
query GetSongSubmissionById($id: String!) {
  getSongSubmissionById(id: $id) {
    id
    prompt_id
    song {
      imageUrl
      album
      previewUrl
      artist
      name
      uri
      id
    }
    submitted_by
    votes
  }
}
`

export default {
  LOGIN_USER,
  REGISTER_USER,
  GET_ME,
  LOGOUT_USER,
  GET_USER,
  IS_AUTHENTICATED,
  GET_PROMPTS,
  GET_PROMPT,
  GET_COMMENT,
  GET_SONG_SUB
};
