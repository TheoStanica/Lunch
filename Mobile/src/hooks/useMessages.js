import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/actions/userActions';

const useMessages = () => {
  const {message} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setUser({message: ''}));
    };
  }, []);

  return message;
};

export default useMessages;
