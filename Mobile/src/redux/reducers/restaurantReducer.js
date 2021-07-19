import {SET_RESTAURANTS, UPDATE_RESTAURANT, DELETE_RESTAURANT} from '../types';

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

    case UPDATE_RESTAURANT: {
      return {
        ...state,
        restaurantsById: {
          ...state.restaurantsById,
          [action.payload.id]: {
            ...state.restaurantsById[action.payload.id],
            name: action.payload.name
              ? action.payload.name
              : state.restaurantsById[action.payload.id].name,
            cost: action.payload.cost
              ? action.payload.cost
              : state.restaurantsById[action.payload.id].cost,
            status: action.payload.status
              ? action.payload.status
              : state.restaurantsById[action.payload.id].status,
          },
        },
      };
    }

    case DELETE_RESTAURANT: {
      return {
        ...state,
        restaurants: state.restaurants.filter(
          restaurantId => restaurantId !== action.payload.id,
        ),
        restaurantsById: {
          ...state.restaurantsById,
          [action.payload.id]: undefined,
        },
      };
    }

    default:
      return state;
  }
};

export default restaurantReducer;
