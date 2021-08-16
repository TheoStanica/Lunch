import {handleError} from './errorThunks';
import {createDeviceRequest} from './httpRequests';

export const registerDevice =
  ({fcmToken}) =>
  async dispatch => {
    try {
      await createDeviceRequest({fcmToken});
    } catch (error) {
      dispatch(handleError(error));
    }
  };
