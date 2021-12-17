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

const SEARCH_QUERY = gql`
query SearchSongs($query: String!, $page: Float!) {
  searchSongs(query: $query, page: $page) {
    id
    uri
    name
    artist
    previewUrl
    album
    imageUrl
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

const GET_SONG_SUBS = gql`
query GetSongSubmissions {
  getSongSubmissions {
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

const ADD_PROMPT = gql`
mutation Mutation( $prompt: String!, $dateCloses: DateTime!) {
  addPrompt(prompt: $prompt, dateCloses: $dateCloses) {
    id
    prompt
    submittedSongs
    posted_by
    comments
    datePosted
    dateCloses
    isClosed
  }
}`

const ADD_COMMENT = gql`
mutation Mutation($comment: String!, $promptId: String!) {
  addComment(comment: $comment, prompt_id: $promptId) {
    id
    prompt_id
    comment
    posted_by
    likes
  }
}`

const DELETE_COMMENT = gql`
mutation Mutation($id: String!) {
  deleteComment(id: $id) {
    id
    prompt_id
    comment
    posted_by
    likes
  }
}`

const UPDATE_USER = gql`
mutation UpdateUser($id: String!, $username: String, $email: String, $password: String) {
  updateUser(id: $id, username: $username, email: $email, password: $password) {
    id
    username
    email
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
  SEARCH_QUERY,
  GET_PROMPTS,
  GET_PROMPT,
  GET_COMMENT,
  GET_SONG_SUB,
  ADD_COMMENT,
  GET_SONG_SUBS,
  ADD_PROMPT,
  UPDATE_USER,
  DELETE_COMMENT
};
