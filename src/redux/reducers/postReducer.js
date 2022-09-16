import { GET_POSTS, FETCH_POSTS } from "../actions/post/actionTypes";

const initialState = {
  getPostsLoading: false,
  posts: [],
};

const getPosts = (state, action) => ({
  ...state,
  getPostsLoading: true,
});

const fetchPosts = (state, action) => {
  console.log("check the data in reducer", action);
  return {
    ...state,
    getPostsLoading: false,
    posts: action.payload,
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
