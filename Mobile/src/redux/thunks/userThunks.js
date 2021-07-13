import {
  userLoginRequest,
  userRegisterRequest,
  userForgotPasswordRequest,
  userGetRequest,
  activateAccount,
} from './httpRequests';
import {resetUser, setUser} from '../actions/userActions';
import {handleError} from './errorThunks';

export const loginUser =
  ({email, password}) =>
  async dispatch => {
    try {
      const response = await userLoginRequest({email, password});

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
      await userRegisterRequest({email, password, fullname});
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
      await userForgotPasswordRequest({email, password, token});
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

export const getUser = () => async dispatch => {
  try {
    const response = await userGetRequest();

    dispatch(setUser(response.data.user));
  } catch (error) {
    dispatch(handleError(error));
  }
};
