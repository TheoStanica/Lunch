import axios from 'axios';
import {setUser} from '../redux/actions/userActions';
// import { logoutUser, setUserTokens } from '../redux/actions/userActions';
import store from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const setAuthHeaderValue = () => {
  return `Bearer ${store.getState().userReducer.accessToken}`;
};

const axiosInstance = axios.create(
  {baseURL: 'http://10.0.2.2:3000/api'},
  {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: setAuthHeaderValue(),
    },
  },
);

axiosInstance.interceptors.request.use(
  config => {
    if (store.getState().userReducer.accessToken)
      config.headers.Authorization = setAuthHeaderValue();
    return config;
  },
  error => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axiosInstance
          .post('/user/refresh', {
            refreshToken: store.getState().userReducer.refreshToken,
          })
          .then(async ({data}) => {
            await AsyncStorage.setItem('accessToken', data.accessToken);
            originalRequest.headers['Authorization'] =
              'Bearer ' + data.accessToken;
            processQueue(null, data.refreshToken);
            resolve(axiosInstance(originalRequest));
          })
          .catch(async err => {
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;