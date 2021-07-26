import {orderCreateRequest} from './httpRequests';
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
