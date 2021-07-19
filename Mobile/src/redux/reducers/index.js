import {combineReducers} from 'redux';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';
import restaurantReducer from './restaurantReducer';

export default combineReducers({
  userReducer,
  errorsReducer,
  restaurantReducer,
});
