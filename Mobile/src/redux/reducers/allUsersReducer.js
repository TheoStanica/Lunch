import {SET_ALLUSERS, DELETE_USER, UPDATE_USER} from '../types';

const INITIAL_STATE = {
  allUsers: [],
  allUsersById: {},
};

const allUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALLUSERS:
      const _allUsers = [],
        _allUsersById = {};

      action.payload.allUsers.forEach(user => {
        _allUsers.push(user.id);
        _allUsersById[user.id] = user;
      });

      return {allUsers: _allUsers, allUsersById: _allUsersById};

    case DELETE_USER:
      const {[action.payload.user]: _, ...allUsersById} = state.allUsersById,
        allUsers = state.allUsers.filter(user => user !== action.payload.user);

      return {allUsers, allUsersById};

    case UPDATE_USER:
      const {[action.payload.id]: user, ...__allUsersById} = state.allUsersById,
        __allUsers = state.allUsers;

      __allUsersById[user.id] = {
        ...user,
        ...action.payload,
      };
      return {allUsers: __allUsers, allUsersById: __allUsersById};

    default:
      return state;
  }
};

export default allUsersReducer;
