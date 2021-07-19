import {
  userLoginRequest,
  userRegisterRequest,
  userForgotPasswordRequest,
  userGetRequest,
  userActivateAccountRequest,
  userPutRequest,
  userGetAllRequest,
  userDeleteRequest,
} from './httpRequests';
import {resetUser, setUser} from '../actions/userActions';
import {
  setAllUsers,
  deleteUserAction,
  updateUserAction,
} from '../actions/allUsersActions';
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
      const response = await userPutRequest({
        _userId,
        email,
        password,
        fullname,
        role,
      });

      if (!_userId) {
        dispatch(setUser(response.data.user));
      } else {
        dispatch(updateUserAction(response.data.user));
      }
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const getAllUsers = callback => async dispatch => {
  try {
    const response = await userGetAllRequest();

    dispatch(setAllUsers({allUsers: response.data.users}));
    if (typeof callback == 'function') callback();
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const deleteUser =
  ({_userId}) =>
  async dispatch => {
    try {
      await userDeleteRequest({_userId});

      dispatch(deleteUserAction({user: _userId}));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
