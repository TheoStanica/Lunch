import {SET_ALLMENUS, DELETE_MENUS} from '../types';

export const setAllMenusAction = allMenus => {
  return {
    type: SET_ALLMENUS,
    payload: allMenus,
  };
};

export const deleteMenusAction = menu => {
  return {
    type: DELETE_MENUS,
    payload: menu,
  };
};
