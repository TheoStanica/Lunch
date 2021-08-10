import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';

const useMenuExpired = ({menuId}) => {
  const {menusById} = useSelector(state => ({
    ...state.menuReducer,
  }));
  const [menuExpired, setMenuExpired] = useState(
    isMenuExpired(menusById[menuId].restaurantId.cancelAt),
  );

  useEffect(() => {
    const timeLeft = getTimeLeft(menusById[menuId].restaurantId.cancelAt);
    let clear = null;
    if (timeLeft > 0) {
      clear = setTimeout(() => {
        setMenuExpired(true);
      }, timeLeft);
    }

    return () => {
      if (clear) clearTimeout(clear);
    };
  }, [menuId]);

  return menuExpired;
};

const isMenuExpired = cancelAt =>
  moment().isAfter(moment(cancelAt, 'LT').format());

const getTimeLeft = cancelAt => {
  const now = moment();
  const expireDate = moment(cancelAt, 'LT');
  return moment.duration(expireDate - now)._milliseconds;
};

export default useMenuExpired;
