import {SET_ALLUSERS, REMOVE_USER, EDIT_USER} from '../types';

export const setAllUsers = allUsers => {
  return {
    type: SET_ALLUSERS,
    payload: allUsers,
  };
};

export const removeUser = user => {
  return {
    type: REMOVE_USER,
    payload: user,
  };
};

export const editUser = (id, email, fullname, role) => {
  return {
    type: EDIT_USER,
    payload: id,
    email,
    fullname,
    role,
  };
};
