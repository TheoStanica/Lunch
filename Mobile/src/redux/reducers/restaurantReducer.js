import {SET_RESTAURANTS} from '../types';

const initialState = {
  restaurants: [],
  restaurantsById: {},
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESTAURANTS: {
      return {
        ...state,
        restaurants: action.payload.restaurants,
        restaurantsById: action.payload.restaurantsById,
      };
    }
    default:
      return state;
  }
};

export default restaurantReducer;
