import {setRestaurants} from '../actions/restaurantActions';
import {handleError} from './errorThunks';
import {restaurantGetRestaurantsRequest} from './httpRequests';

export const getRestaurants =
  ({onFinish = () => {}}) =>
  async dispatch => {
    try {
      const response = await restaurantGetRestaurantsRequest();

      const restaurantsObj = response.data.reduce(
        (obj, restaurant) => ({...obj, [restaurant.id]: {...restaurant}}),
        {},
      );
      const restaurantIds = response.data.map(restaurant => restaurant.id);

      dispatch(
        setRestaurants({
          restaurants: restaurantIds,
          restaurantsById: restaurantsObj,
        }),
      );
      onFinish(null);
    } catch (error) {
      dispatch(handleError(error));
      onFinish(error);
    }
  };
