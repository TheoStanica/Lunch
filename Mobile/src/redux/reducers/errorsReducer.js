import {SET_ERRORS, RESET_ERRORS} from '../types';

const initialState = {
  errors: null,
};

const errorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return {
        errors: action.payload.errors,
      };
    case RESET_ERRORS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
export default errorsReducer;
