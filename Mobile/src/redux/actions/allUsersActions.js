import {SET_ALLUSERS, REMOVE_USER} from '../types';

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
