import client from "../config/esConnection";
import { User } from "../schemas/User";
import { v4 as uuid } from "uuid";
import { userPatch } from "../config/types";
import promptService from "./promptService";
import commentService from "./commentService";
import songSubmissionService from "./songSubmissionService";

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
    refresh:'wait_for'
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

    //must update comment if likes changed
    if(newUser.likes !== []){
      for(let likeId of newUser.likes){
        if(oldUser.likes.indexOf(likeId) === -1){//if the old comment likes does not contain the new user likesId, then comment should be updated
            let comment = await commentService.getCommentById(likeId);
            comment.likes = [...comment.likes, newUser.id];
            let updatedComment = await commentService.updateComment(comment);
            console.log(updatedComment);
        }
    }
    }

    //must update songSubmission if votes changed
    if(newUser.votes !== []){
      for(let voteId of newUser.votes){
        if(oldUser.votes.indexOf(voteId) === -1){//if the old comment votes does not contain the new user votesId, then comment should be updated
            let songSubmission = await songSubmissionService.getSongSubmissionById(voteId);
            songSubmission.votes = [...songSubmission.votes, newUser.id];
            let updatedSongSubmission = await songSubmissionService.updateSongSubmission(songSubmission);
            console.log(updatedSongSubmission);
        }
    }
    }

    await client.update({
        index: 'users',
        id: newUser.id,
        body: {doc:newUser},
        refresh:'wait_for'
    });
    return newUser;

};

const deleteUser = async (userId : string) : Promise<User> =>{
  if(!userId){
    throw "Must provide ID to delete user";
  }

  let user = await getUserById(userId);
  let {prompts, likes, votes, submissions, comments} = user;

  //update song submissions to remove user id from votes arr
  for(let voteId of votes){
    let songSub = await songSubmissionService.getSongSubmissionById(voteId);
    let index = songSub.votes.indexOf(userId);
    if(index == -1){
      throw "Error, couldn't find index of user in votes of song sub"
    }
    songSub.votes.splice(index,1);
    let updatedSongSub = await songSubmissionService.updateSongSubmission(songSub);
  }

  //update comments to remove user id from likes
  for (let likeId of likes){
    let comment = await commentService.getCommentById(likeId);
    let ind = comment.likes.indexOf(userId);
    if(ind === -1){
      throw "Error, couldn't find index of user in likes of comment"
    }
    comment.likes.splice(ind,1);
    let updatedComment = await commentService.updateComment(comment);
  }

  //delete all of users comments
  for(let commentId of comments){
    let deletedComment = await commentService.deleteComment(commentId);
  }

  //delete all of users song subs
  for(let songSubId of submissions){
    let deletedSongSub = await songSubmissionService.deleteSongSubmission(songSubId);
  }

  //delete all of users prompts
  for(let promptId of prompts){
     let deletedPrompt = await promptService.deletePrompt(promptId);
  }

  await client.delete({
    id:userId,
    index:'users',
    refresh:'wait_for'
  })

  return user;
}

export default {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser
};

