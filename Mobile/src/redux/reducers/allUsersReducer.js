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
      const {[action.payload.user]: _, ...allUsersById} = state.allUsersById;
      const allUsers = state.allUsers.filter(
        user => user !== action.payload.user,
      );

      return {allUsers, allUsersById};

    default:
      return state;
  }
};

export default allUsersReducer;
