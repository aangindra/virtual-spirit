import { combineReducers } from "redux";
import postReducer from "./postReducer";

const appReducer = combineReducers({
  post: postReducer,
});
export default appReducer;
