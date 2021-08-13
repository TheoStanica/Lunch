import {handleError} from './errorThunks';
import {createDeviceRequest} from './httpRequests';

export const createDevice =
  ({fcmToken}) =>
  async dispatch => {
    try {
      await createDeviceRequest({fcmToken});
    } catch (error) {
      dispatch(handleError(error));
    }
  };
