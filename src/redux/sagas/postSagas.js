import { all, call, put, takeLatest } from "redux-saga/effects";
import { GET_POSTS } from "../actions/post/actionTypes";
import { fetchPosts } from "../actions/post";
import { getRequest } from "./request";
import ENDPOINTS from "../../constants/endpoints";

function* getPosts(action) {
  const { from, to } = action.payload;
  try {
    for (let i = from; i <= to; i++) {
      yield call(getPostById, i);
    }
  } catch (error) {
    console.log(error);
  }
}

function* getPostById(id) {
  try {
    const response = yield call(getRequest, ENDPOINTS.FETCH_POSTS + "/" + id);
    yield put(fetchPosts(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* watchGetRequest() {
  yield takeLatest(GET_POSTS, getPosts);
}

export default function* sagas() {
  yield all([watchGetRequest()]);
}
