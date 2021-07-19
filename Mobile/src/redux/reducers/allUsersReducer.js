import {SET_ALLUSERS, REMOVE_USER} from '../types';

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
      return state;

    default:
      return state;
  }
};

export default allUsersReducer;
