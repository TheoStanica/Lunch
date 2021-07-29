import {
  orderCreateRequest,
  orderGetRequest,
  orderUpdateRequest,
} from './httpRequests';
import {handleError} from './errorThunks';

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
  ({filter}, callback) =>
  async dispatch => {
    try {
      const res = await orderGetRequest({filter});
      if (typeof callback == 'function') callback(res.data);
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
