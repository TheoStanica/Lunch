import {
  loginRequest,
  registerRequest,
  forgotPassword,
  activateAccount,
} from './httpRequests';
import {resetUser, setUser} from '../actions/userActions';
import {handleError} from './errorThunks';

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
      dispatch(handleError(error));
    }
  };

export const registerUser =
  ({email, password, fullname, onFinish}) =>
  async dispatch => {
    try {
      await registerRequest({email, password, fullname});
      onFinish(null);
    } catch (error) {
      dispatch(handleError(error));
      onFinish(error);
    }
  };

export const forgotPasswordUser =
  ({email, password, token, onFinish}) =>
  async dispatch => {
    try {
      await forgotPassword({email, password, token});
      onFinish(null);
    } catch (error) {
      dispatch(handleError(error));
      onFinish(error);
    }
  };

export const activateAccountUser =
  ({activationToken, onFinish}) =>
  async dispatch => {
    try {
      await activateAccount({activationToken});
      onFinish(null);
    } catch (error) {
      dispatch(handleError(error));
      onFinish(error);
    }
  };

export const logoutUser = () => dispatch => {
  dispatch(resetUser());
};
