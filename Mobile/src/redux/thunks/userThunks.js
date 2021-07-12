import {
  userLoginRequest,
  userRegisterRequest,
  useerForgotPasswordRequest,
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
      await useerForgotPasswordRequest({email, password, token});
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
