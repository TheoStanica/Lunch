import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetErrors} from '../redux/actions/errorsActions';
import Toast from 'react-native-simple-toast';

const DisplayErrors = () => {
  const {errors} = useSelector(state => state.errorsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetErrors());
    };
  }, []);

  useEffect(() => {
    if (errors?.length > 0) {
      errors.map(err => {
        Toast.show(err.message, Toast.LONG);
      });
    }
  }, [errors]);

  return null;
};

export default DisplayErrors;
