import {SET_ALLUSERS, REMOVE_USER} from '../types';

const INITIAL_STATE = {
  allUsers: [],
  allUsersById: {},
};

const allUsersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALLUSERS:
      return state;

    case REMOVE_USER:
      return state;

    default:
      return state;
  }
};

export default allUsersReducer;
