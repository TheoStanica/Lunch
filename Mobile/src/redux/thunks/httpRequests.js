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

export const userPutRequest = async ({
  _userId,
  email,
  password,
  fullname,
  role,
}) => {
  if (!_userId) {
    return await api.put('user', {email, password, fullname, role});
  } else {
    return await api.put(`/user/${_userId}`, {email, password, fullname, role});
  }
};

export const userGetAllRequest = async () => {
  return await api.get('/user/all');
};

export const userDeleteRequest = async ({_userId}) => {
  return await api.delete(`/user/${_userId}`);
};
