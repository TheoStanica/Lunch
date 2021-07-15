import api from '../../api/buildClient';

export const userLoginRequest = async ({email, password}) => {
  return await api.post('/user/login', {email, password});
};

export const userRegisterRequest = async ({email, password, fullname}) => {
  return await api.post('/user/register', {
    email,
    password,
    fullname,
  });
};

export const userForgotPasswordRequest = async ({email, password, token}) => {
  if (email) {
    return await api.post('/user/forgotpassword', {email});
  } else {
    return await api.post(`/user/forgotpassword/${token}`, {password});
  }
};

export const userActivateAccountRequest = async ({activationToken}) => {
  return await api.get(`/user/activate/${activationToken}`);
};

export const userGetRequest = async () => {
  return await api.get('/user');
};

export const userPutRequest = async ({email, password, fullname}) => {
  return await api.put('/user', {email, password, fullname});
};

export const restaurantGetRestaurantsRequest = async () => {
  return await api.get('/restaurant');
};
