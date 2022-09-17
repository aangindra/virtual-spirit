import {
  GET_POSTS,
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  REMOVE_POST,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from "./actionTypes";

export const getPosts = (data) => ({
  type: GET_POSTS,
  payload: data,
});

export const fetchPosts = (data) => ({
  type: FETCH_POSTS,
  payload: data,
});

export const addPost = (data) => ({
  type: ADD_POST,
  payload: data,
});

export const editPost = (data) => ({
  type: EDIT_POST,
  payload: data,
});

export const removePost = (data) => ({
  type: REMOVE_POST,
  payload: data,
});

export const createPost = (data) => ({
  type: CREATE_POST,
  payload: data,
});

export const updatePost = (data) => ({
  type: UPDATE_POST,
  payload: data,
});

export const deletePost = (data) => ({
  type: DELETE_POST,
  payload: data,
});
