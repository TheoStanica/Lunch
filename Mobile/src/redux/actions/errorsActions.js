import {SET_ERRORS, RESET_ERRORS} from '../types';

export const setErrors = errors => {
  return {
    type: SET_ERRORS,
    payload: {errors},
  };
};

export const resetErrors = () => {
  return {
    type: RESET_ERRORS,
  };
};
