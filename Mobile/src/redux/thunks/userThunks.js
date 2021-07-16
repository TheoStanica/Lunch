import {
  userLoginRequest,
  userRegisterRequest,
  userForgotPasswordRequest,
  userGetRequest,
  userActivateAccountRequest,
  userPutRequest,
  userGetAllRequest,
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
      await userActivateAccountRequest({activationToken});
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

export const updateUser =
  ({_userId, email, password, fullname, role}) =>
  async dispatch => {
    try {
      await userPutRequest({_userId, email, password, fullname, role});
      if (!_userId) {
        dispatch(setUser({email, password, fullname, role}));
      }
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const getAllUsers =
  ({onFinish}) =>
  async dispatch => {
    try {
      const response = await userGetAllRequest();

      onFinish(response.data.users);
    } catch (error) {
      dispatch(handleError(error));
      onFinish(null);
    }
  };
