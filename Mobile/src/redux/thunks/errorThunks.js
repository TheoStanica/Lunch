import {setErrors} from '../actions/errorsActions';

export const handleError = error => async dispatch => {
  if (error?.response?.data?.errors) {
    dispatch(setErrors(error.response.data.errors));
  } else {
    console.log(error);
    dispatch(setErrors([{message: 'Something went wrong'}]));
  }
};
