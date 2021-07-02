import { applyMiddleware, combineReducers, createStore } from "redux";
import { user } from "./module";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({ user: user });

const middleWare = [thunk];

if (process.env.NODE_ENV === "DEV") {
  middleWare.push(logger);
}
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleWare)),
);
export default store;
