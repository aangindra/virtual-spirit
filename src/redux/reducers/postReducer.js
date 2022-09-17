import { GET_POSTS, FETCH_POSTS } from "../actions/post/actionTypes";

const initialState = {
  getPostsLoading: false,
  posts: [],
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
  };
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return getPosts(state, action);
    case FETCH_POSTS:
      return fetchPosts(state, action);
    default:
      return state;
  }
};

export default postReducer;
