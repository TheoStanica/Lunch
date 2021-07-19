import {DELETE_RESTAURANT, SET_RESTAURANTS, UPDATE_RESTAURANT} from '../types';

export const setRestaurantsAction = ({restaurants, restaurantsById}) => {
  return {
    type: SET_RESTAURANTS,
    payload: {
      restaurants,
      restaurantsById,
    },
  };
};
export const updateRestaurantAction = ({id, name, cost, status}) => {
  return {
    type: UPDATE_RESTAURANT,
    payload: {
      id,
      name,
      cost,
      status,
    },
  };
};
export const deleteRestaurantAction = ({id}) => {
  return {
    type: DELETE_RESTAURANT,
    payload: {
      id,
    },
  };
};
