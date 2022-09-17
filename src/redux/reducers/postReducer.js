import lodash from "lodash";
import {
  GET_POSTS,
  FETCH_POSTS,
  ADD_POST,
  EDIT_POST,
  CREATE_POST,
  UPDATE_POST,
  REMOVE_POST,
} from "../actions/post/actionTypes";

const initialState = {
  getPostsLoading: false,
  posts: [],
  isFetching: false,
};

const getPosts = (state, action) => {
  return {
    ...state,
    getPostsLoading: true,
  };
};

const fetchPosts = (state, action) => {
  return {
    ...state,
    getPostsLoading: false,
    posts: state.posts.concat(action.payload),
    isFetching: true,
  };
};

const addPost = (state, action) => {
  return {
    ...state,
    posts: [action.payload, ...state.posts],
    getPostsLoading: false,
  };
};

const editPost = (state, action) => {
  const { payload } = action;
  const id = lodash.findIndex(state.posts, ["id", payload.id]);
  state.posts[id] = payload;

  return {
    ...state,
    getPostsLoading: false,
  };
};

const removePost = (state, action) => {
  const { payload } = action;
  const id = lodash.findIndex(state.posts, ["id", payload.id]);
  delete state.posts[id];

  return {
    ...state,
    getPostsLoading: false,
  };
};

const createPost = (state, action) => {
  return {
    ...state,
    getPostsLoading: true,
  };
};

const updatePost = (state, action) => {
  return {
    ...state,
    getPostsLoading: true,
  };
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return getPosts(state, action);
    case FETCH_POSTS:
      return fetchPosts(state, action);
    case ADD_POST:
      return addPost(state, action);
    case EDIT_POST:
      return editPost(state, action);
    case REMOVE_POST:
      return removePost(state, action);
    case CREATE_POST:
      return createPost(state, action);
    case UPDATE_POST:
      return updatePost(state, action);
    default:
      return state;
  }
};

export default postReducer;
