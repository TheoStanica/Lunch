import {combineReducers} from 'redux';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import allUsersReducer from './allUsersReducer';
import restaurantReducer from './restaurantReducer';
import menuReducer from './menuReducer';

export default combineReducers({
  userReducer,
  allUsersReducer,
  errorsReducer,
  restaurantReducer,
  menuReducer,
});
