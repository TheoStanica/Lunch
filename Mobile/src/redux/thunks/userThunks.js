import {loginRequest, registerRequest} from './httpRequests';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser =
  ({email, password}) =>
  async () => {
    try {
      const response = await loginRequest({email, password});

      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

export const registerUser =
  ({email, password, fullname}) =>
  async () => {
    try {
      await registerRequest({email, password, fullname});
    } catch (error) {
      console.log(error);
    }
  };
