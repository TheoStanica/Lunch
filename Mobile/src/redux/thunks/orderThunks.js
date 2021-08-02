import {
  orderCreateRequest,
  orderGetRequest,
  orderUpdateRequest,
} from './httpRequests';
import {handleError} from './errorThunks';
import {setOrdersAction} from '../actions/ordersActions';

export const createOrder =
  ({menuId, userId, type, menuOptions}, callback) =>
  async dispatch => {
    try {
      await orderCreateRequest({menuId, userId, type, menuOptions});
      if (typeof callback == 'function') callback();
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const getOrder =
  ({filter, privilege}, callback) =>
  async dispatch => {
    try {
      const response = await orderGetRequest({filter});

      if (privilege === 'admin')
        dispatch(setOrdersAction({orders: response.data.orders}));
      if (typeof callback == 'function') callback(response.data);
    } catch (error) {
      dispatch(handleError(error));
      if (typeof callback == 'function') callback(null);
    }
  };

export const updateOrder =
  ({orderId, type, status, userId, menuId, menuOptions}, callback) =>
  async dispatch => {
    try {
      await orderUpdateRequest({
        orderId,
        type,
        status,
        userId,
        menuId,
        menuOptions,
      });

      if (typeof callback == 'function') callback();
    } catch (error) {
      dispatch(handleError(error));
    }
  };
