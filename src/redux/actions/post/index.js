import { GET_POSTS, FETCH_POSTS } from "./actionTypes";

export const getPosts = () => ({
  type: GET_POSTS,
});

export const fetchPosts = (data) => ({
  type: FETCH_POSTS,
  payload: data,
});
