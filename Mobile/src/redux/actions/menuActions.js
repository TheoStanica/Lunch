import {SET_MENUS, DELETE_MENUS} from '../types';

export const setMenusAction = menus => {
  return {
    type: SET_MENUS,
    payload: menus,
  };
};

export const deleteMenuAction = menu => {
  return {
    type: DELETE_MENUS,
    payload: menu,
  };
};
