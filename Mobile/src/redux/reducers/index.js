import {combineReducers} from 'redux';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import allUsersReducer from './allUsersReducer';
import restaurantReducer from './restaurantReducer';
import menuReducer from './menuReducer';
import allMenusReducer from './allMenusReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
  userReducer,
  allUsersReducer,
  errorsReducer,
  restaurantReducer,
  menuReducer,
  allMenusReducer,
  ordersReducer,
});
