import {combineReducers} from 'redux';
import userReducer from './userReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  userReducer,
  errorsReducer,
});
