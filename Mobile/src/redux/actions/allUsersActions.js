import {SET_ALLUSERS, DELETE_USER, UPDATE_USER} from '../types';

export const setAllUsers = allUsers => {
  return {
    type: SET_ALLUSERS,
    payload: allUsers,
  };
};

export const deleteUserAction = user => {
  return {
    type: DELETE_USER,
    payload: user,
  };
};

export const updateUserAction = (id, email, fullname, role) => {
  return {
    type: UPDATE_USER,
    payload: id,
    email,
    fullname,
    role,
  };
};
