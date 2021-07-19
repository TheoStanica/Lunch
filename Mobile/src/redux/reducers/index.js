import {combineReducers} from 'redux';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import allUsersReducer from './allUsersReducer';
import restaurantReducer from './restaurantReducer';

export default combineReducers({
  userReducer,
  allUsersReducer,
  errorsReducer,
  restaurantReducer,
});
