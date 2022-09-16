import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCH_POSTS, GET_POSTS } from "../actions/post/actionTypes";
import { fetchPosts } from "../actions/post";
import { getRequest } from "./request";
import ENDPOINTS from "../../constants/endpoints";

function* getJsonData() {
  try {
    const response = yield call(getRequest, ENDPOINTS.FETCH_POSTS);
    if (response.data) {
      //   pushNotification("Get data success", "success", "TOP_CENTER", 1000);
      yield put(fetchPosts(response.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchGetRequest() {
  yield takeLatest(GET_POSTS, getJsonData);
}

export default function* sagas() {
  yield all([watchGetRequest()]);
}
