import {loginRequest, registerRequest} from './httpRequests';
import {setUser} from '../actions/userActions';

export const loginUser =
  ({email, password}) =>
  async dispatch => {
    try {
      const response = await loginRequest({email, password});

      dispatch(
        setUser({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        }),
      );
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
      console.log(error?.response?.data);
    }
  };
