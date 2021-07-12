import {
  userLoginRequest,
  userRegisterRequest,
  userForgotPasswordRequest,
  userGetRequest,
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
  ({email, password, fullname}) =>
  async dispatch => {
    try {
      await userRegisterRequest({email, password, fullname});
      dispatch(
        setUser({
          message:
            'Account created! Please check your email to activate your account.',
        }),
      );
      setTimeout(() => {
        dispatch(
          setUser({
            message: '',
          }),
        );
      }, 10000);
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const forgotPasswordUser =
  ({email, password, token}) =>
  async dispatch => {
    try {
      await userForgotPasswordRequest({email, password, token});
      dispatch(
        setUser({
          message: 'Password was reseted.',
        }),
      );
      setTimeout(() => {
        dispatch(
          setUser({
            message: '',
          }),
        );
      }, 10000);
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const logoutUser = () => dispatch => {
  dispatch(resetUser());
};

export const getUser = () => async dispatch => {
  try {
    const response = await userGetRequest();

    console.log(response.data.user);
    dispatch(setUser(response.data.user));
  } catch (error) {
    dispatch(handleError(error));
  }
};
