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
  ({email, password, fullname}) =>
  async dispatch => {
    try {
      await registerRequest({email, password, fullname});
      dispatch(
        setUser({
          message:
            'Account created! Please check your email to activate your account.',
        }),
      );
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const forgotPasswordUser =
  ({email, password, token}) =>
  async dispatch => {
    try {
      await forgotPassword({email, password, token});

      if (email) {
        dispatch(
          setUser({
            message: 'Please check your email to reset your password.',
          }),
        );
      } else {
        dispatch(
          setUser({
            message: 'Password was reseted.',
          }),
        );
      }
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const activateAccountUser =
  ({activationToken}) =>
  async dispatch => {
    try {
      await activateAccount({activationToken});
      dispatch(
        setUser({
          message: 'Account activated!',
        }),
      );
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const logoutUser = () => dispatch => {
  dispatch(resetUser());
};
