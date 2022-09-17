import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  GET_POSTS,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from "../actions/post/actionTypes";
import { fetchPosts, addPost, editPost, removePost } from "../actions/post";
import {
  getRequest,
  postRequest,
  patchRequest,
  deleteRequest,
} from "./request";
import ENDPOINTS from "../../constants/endpoints";
import { handleError } from "../../libs/errors";

function* getPosts(action) {
  const { from, to } = action.payload;
  try {
    for (let i = from; i <= to; i++) {
      yield call(getPostById, i);
    }
  } catch (err) {
    handleError(err);
    console.log(err);
  }
}

function* getPostById(id) {
  try {
    const response = yield call(getRequest, ENDPOINTS.POSTS + "/" + id);
    yield put(fetchPosts(response.data));
  } catch (err) {
    handleError(err);
  }
}

function* createPost(action) {
  try {
    const { payload } = action;
    const response = yield call(postRequest, ENDPOINTS.POSTS, payload);
    yield put(addPost(response.data));
  } catch (err) {
    handleError(err);
  }
}

function* updatePost(action) {
  try {
    const { payload } = action;
    const response = yield call(
      patchRequest,
      ENDPOINTS.POSTS + `/${payload.id}`,
      payload
    );
    yield put(editPost(response.data));
  } catch (err) {
    handleError(err);
  }
}

function* deletePost(action) {
  try {
    const { payload } = action;
    yield call(deleteRequest, ENDPOINTS.POSTS + `/${payload.id}`, payload);
    yield put(removePost(payload));
  } catch (err) {
    handleError(err);
  }
}

function* watchRequest() {
  yield takeLatest(GET_POSTS, getPosts);
  yield takeLatest(CREATE_POST, createPost);
  yield takeLatest(UPDATE_POST, updatePost);
  yield takeLatest(DELETE_POST, deletePost);
}

export default function* sagas() {
  yield all([watchRequest()]);
}
