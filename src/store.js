import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./redux/reducers";
import rootSagas from "./redux/sagas";

// Create sagas middleware

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
function configureStore() {
  return createStore(rootReducer, applyMiddleware(...middlewares));
}

const store = configureStore();
sagaMiddleware.run(rootSagas);

export default store;
