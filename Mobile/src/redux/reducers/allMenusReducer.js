import {SET_ALLMENUS, DELETE_MENUS} from '../types';

const INITIAL_STATE = {
  allMenus: [],
  allMenusById: {},
};

const allMenusReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ALLMENUS:
      const _allMenus = [],
        _allMenusById = {};

      action.payload.allMenus.forEach(menu => {
        _allMenus.push(menu.id);
        _allMenusById[menu.id] = menu;
      });

      return {allMenus: _allMenus, allMenusById: _allMenusById};

    case DELETE_MENUS:
      const {[action.payload.menu]: _, ...allMenusById} = state.allMenusById,
        allMenus = state.allMenus.filter(menu => menu !== action.payload.menu);

      return {allMenus, allMenusById};

    default:
      return state;
  }
};

export default allMenusReducer;
