import {SET_USER, RESET_USER} from '../types';

const initialState = {
  id: '',
  fullname: '',
  email: '',
  role: '',
  status: '',
  message: '',
  accessToken: '',
  refreshToken: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case RESET_USER: {
      return {...initialState};
    }

    default:
      return state;
  }
};

export default userReducer;
