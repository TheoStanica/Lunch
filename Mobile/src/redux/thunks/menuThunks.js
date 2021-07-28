import {
  menuGetRequest,
  menuPostRequest,
  menuDeleteRequest,
} from './httpRequests';
import {setMenusAction, deleteMenuAction} from '../actions/menuActions';
import {handleError} from './errorThunks';

export const getMenus =
  ({filter, callback}) =>
  async dispatch => {
    try {
      const response = await menuGetRequest({filter});

      dispatch(setMenusAction({menus: response.data.menus}));
      if (typeof callback == 'function') callback();
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const createMenu =
  ({menu, restaurantId}, callback) =>
  async dispatch => {
    try {
      await menuPostRequest({menu, restaurantId});
      if (typeof callback == 'function') callback();
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const deleteMenu =
  ({_menuId}) =>
  async dispatch => {
    try {
      await menuDeleteRequest({_menuId});

      dispatch(deleteMenuAction({menu: _menuId}));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
