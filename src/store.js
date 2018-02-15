import { createStore, applyMiddleware } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './ducks/reducer';

export default createStore( reducer, composeWithDevTools(applyMiddleware(reduxPromiseMiddleware())));