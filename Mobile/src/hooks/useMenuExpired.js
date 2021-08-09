import {useState} from 'react';
import {useTimer} from 'react-timer-hook';
import {useSelector} from 'react-redux';
import moment from 'moment';

const useMenuExpired = ({menuId}) => {
  const {menusById} = useSelector(state => ({
    ...state.menuReducer,
  }));
  const [menuExpired, setMenuExpired] = useState(
    isMenuExpired(menusById[menuId].restaurantId.cancelAt),
  );

  useTimer({
    expiryTimestamp: getExpireTimestamp(
      menusById[menuId].restaurantId.cancelAt,
    ),
    onExpire: () => setMenuExpired(true),
  });

  return menuExpired;
};

const isMenuExpired = cancelAt =>
  moment().isAfter(moment(cancelAt, 'LT').format());

const getExpireTimestamp = cancelAt => {
  return new Date(moment(cancelAt, 'LT').format());
};

export default useMenuExpired;
