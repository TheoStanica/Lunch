import {RESET_ORDERS, SET_ORDERS} from '../types';

export const setOrdersAction = orders => {
  return {
    type: SET_ORDERS,
    payload: orders,
  };
};

export const resetOrdersAction = () => {
  return {
    type: RESET_ORDERS,
  };
};
