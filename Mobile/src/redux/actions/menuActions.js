import {SET_MENUS, DELETE_MENUS, UPDATE_MENU} from '../types';

export const setMenusAction = menus => {
  return {
    type: SET_MENUS,
    payload: menus,
  };
};

export const updateMenuAction = ({menuId, updated}) => {
  return {
    type: UPDATE_MENU,
    payload: {
      menuId,
      updated,
    },
  };
};

export const deleteMenuAction = menu => {
  return {
    type: DELETE_MENUS,
    payload: menu,
  };
};
