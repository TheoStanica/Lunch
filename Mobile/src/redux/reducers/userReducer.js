import {SET_USER} from '../types';

const initialState = {
  id: '',
  fullName: '',
  email: '',
  role: '',
  status: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
