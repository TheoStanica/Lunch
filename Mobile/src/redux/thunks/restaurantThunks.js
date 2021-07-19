import {
  deleteRestaurantAction,
  setRestaurantsAction,
  updateRestaurantAction,
} from '../actions/restaurantActions';
import {handleError} from './errorThunks';
import {
  restaurantDeleteRequest,
  restaurantGetRestaurantsRequest,
  restaurantUpdateRequest,
} from './httpRequests';

export const getRestaurants = callback => async dispatch => {
  try {
    const response = await restaurantGetRestaurantsRequest();

    const restaurantsObj = response.data.reduce(
      (obj, restaurant) => ({...obj, [restaurant.id]: {...restaurant}}),
      {},
    );
    const restaurantIds = response.data.map(restaurant => restaurant.id);

    dispatch(
      setRestaurantsAction({
        restaurants: restaurantIds,
        restaurantsById: restaurantsObj,
      }),
    );

    if (typeof callback == 'function') callback();
  } catch (error) {
    dispatch(handleError(error));
  }
};
export const updateRestaurant =
  ({id, name, cost, status}, callback) =>
  async dispatch => {
    try {
      await restaurantUpdateRequest({id, name, cost, status});

      dispatch(updateRestaurantAction({id, name, cost, status}));

      if (typeof callback == 'function') callback();
    } catch (error) {
      dispatch(handleError(error));
    }
  };

export const deleteRestaurant =
  ({id}) =>
  async dispatch => {
    try {
      await restaurantDeleteRequest({id});
      dispatch(deleteRestaurantAction({id}));
    } catch (error) {
      dispatch(handleError(error));
    }
  };
