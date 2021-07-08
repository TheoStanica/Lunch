import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combineReducers from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userReducer'],
};

const pReducer = persistReducer(persistConfig, combineReducers);

const store = createStore(
  pReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);
let persistor = persistStore(store);

export {store, persistor};
