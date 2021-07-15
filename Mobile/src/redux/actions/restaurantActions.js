import {SET_RESTAURANTS} from '../types';

export const setRestaurants = ({restaurants, restaurantsById}) => {
  return {
    type: SET_RESTAURANTS,
    payload: {
      restaurants,
      restaurantsById,
    },
  };
};
