import {combineReducers} from 'redux';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import allUsersReducer from './allUsersReducer';

export default combineReducers({
  userReducer,
  allUsersReducer,
  errorsReducer,
});
