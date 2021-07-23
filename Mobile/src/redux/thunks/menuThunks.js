import {
  menuGetRequest,
  menuPostRequest,
  menuDeleteRequest,
} from './httpRequests';
import {setMenusAction, deleteMenuAction} from '../actions/menuActions';
import {handleError} from './errorThunks';

export const getMenus =
  ({filter}) =>
  async dispatch => {
    try {
      const response = await menuGetRequest({filter});

      dispatch(setMenusAction({menus: response.data.menus}));
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const createMenu =
  ({menu, restaurantId}) =>
  async dispatch => {
    try {
      await menuPostRequest({menu, restaurantId});
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
