import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import firebase from './firebase';

export default combineReducers({
  reduxAsyncConnect,
  routing: routeReducer,
  firebase: firebase
});
