import {
  menuGetRequest,
  menuPostRequest,
  menuDeleteRequest,
  notifyUsersRequest,
} from './httpRequests';
import {setMenusAction, deleteMenuAction} from '../actions/menuActions';
import {setAllMenusAction, deleteMenusAction} from '../actions/allMenusActions';
import {handleError} from './errorThunks';

export const getMenus =
  ({filter, privilege}, callback) =>
  async dispatch => {
    try {
      const response = await menuGetRequest({filter});

      if (privilege === 'admin') {
        dispatch(
          setAllMenusAction({
            allMenus: response.data.menus.sort((a, b) => {
              if (a.createdAt < b.createdAt) return 1;
              else return -1;
            }),
          }),
        );
      } else {
        dispatch(setMenusAction({menus: response.data.menus}));
      }
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
      dispatch(deleteMenusAction({menu: _menuId}));
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const notifyUsers =
  ({menuId}) =>
  async dispatch => {
    try {
      await notifyUsersRequest({menuId});
    } catch (error) {
      dispatch(handleError(error));
    }
  };
