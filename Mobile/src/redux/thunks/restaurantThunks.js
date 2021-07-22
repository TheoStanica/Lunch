import {
  deleteRestaurantAction,
  setRestaurantsAction,
  updateRestaurantAction,
} from '../actions/restaurantActions';
import {handleError} from './errorThunks';
import {
  restaurantCreateRequest,
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
  ({id, name, cost, status, notifyAfter, cancelAt}, callback) =>
  async dispatch => {
    try {
      await restaurantUpdateRequest({
        id,
        name,
        cost,
        status,
        notifyAfter,
        cancelAt,
      });

      dispatch(
        updateRestaurantAction({id, name, cost, status, notifyAfter, cancelAt}),
      );

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

export const createRestaurant =
  ({name, cost, notifyAfter, cancelAt}, callback) =>
  async dispatch => {
    try {
      await restaurantCreateRequest({name, cost, notifyAfter, cancelAt});
      if (typeof callback == 'function') callback();
    } catch (error) {
      dispatch(handleError(error));
    }
  };
