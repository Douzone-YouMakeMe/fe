import { applyMiddleware, combineReducers, createStore } from 'redux';
import { project, user } from './module';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import wsmiddleware from '../middleware/wsmiddleware';

const rootReducer = combineReducers({ user: user, project: project });

const middleWare = [thunk, wsmiddleware];

if (process.env.NODE_ENV === 'DEV') {
  middleWare.push(logger);
}
const store = createStore(rootReducer, applyMiddleware(...middleWare));
export default store;
