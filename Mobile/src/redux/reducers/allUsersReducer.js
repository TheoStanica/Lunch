import {SET_ALLUSERS, REMOVE_USER, EDIT_USER} from '../types';

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

    case REMOVE_USER:
      const {[action.payload.user]: _, ...allUsersById} = state.allUsersById;
      const allUsers = state.allUsers.filter(
        user => user !== action.payload.user,
      );

      return {allUsers, allUsersById};

    case EDIT_USER:
      const {[action.payload.id]: user, ...__allUsersById} = state.allUsersById;
      const __allUsers = state.allUsers;

      action.payload.email = action.payload.email
        ? action.payload.email
        : user.email;
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
