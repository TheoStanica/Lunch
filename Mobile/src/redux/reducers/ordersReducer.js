import {RESET_ORDERS, SET_ORDERS} from '../types';

const initialState = {
  orders: [],
  ordersById: {},
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      const orders = [],
        ordersById = {};

      action.payload.orders.forEach(order => {
        orders.push(order.id);
        ordersById[order.id] = order;
      });

      return {orders, ordersById};
    }

    case RESET_ORDERS: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default ordersReducer;
