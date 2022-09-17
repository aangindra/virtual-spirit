import { GET_POSTS, FETCH_POSTS } from "./actionTypes";

export const getPosts = (data) => ({
  type: GET_POSTS,
  payload: data,
});

export const fetchPosts = (data) => ({
  type: FETCH_POSTS,
  payload: data,
});
