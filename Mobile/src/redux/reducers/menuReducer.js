import {SET_MENUS, DELETE_MENUS, UPDATE_MENU} from '../types';

const initialState = {
  menus: [],
  menusById: {},
};

const menusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENUS: {
      const _menus = [],
        _menusById = {};

      action.payload.menus.forEach(menu => {
        _menus.push(menu.id);
        _menusById[menu.id] = menu;
      });

      return {menus: _menus, menusById: _menusById};
    }

    case UPDATE_MENU: {
      return {
        ...state,
        menusById: {
          ...state.menusById,
          [action.payload.menuId]: action.payload.updated,
        },
      };
    }

    case DELETE_MENUS: {
      const {[action.payload.menu]: _, ...menusById} = state.menusById,
        menus = state.menus.filter(menu => menu !== action.payload.menu);

      return {menus, menusById};
    }

    default:
      return state;
  }
};

export default menusReducer;
