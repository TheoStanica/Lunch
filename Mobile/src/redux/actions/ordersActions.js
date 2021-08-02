import {SET_ORDERS} from '../types';

export const setOrdersAction = orders => {
  return {
    type: SET_ORDERS,
    payload: orders,
  };
};
