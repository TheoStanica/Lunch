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
  isReminderOn,
  remindAt,
  isOfficeNotificationOn,
}) => {
  if (!_userId) {
    return await api.put('user', {
      email,
      password,
      fullname,
      role,
      isReminderOn,
      remindAt,
      isOfficeNotificationOn,
    });
  } else {
    return await api.put(`/user/${_userId}`, {
      email,
      password,
      fullname,
      role,
      isReminderOn,
      remindAt,
      isOfficeNotificationOn,
    });
  }
};

export const userGetAllRequest = async () => {
  return await api.get('/user/all');
};

export const userDeleteRequest = async ({_userId}) => {
  return await api.delete(`/user/${_userId}`);
};

export const restaurantGetRestaurantsRequest = async () => {
  return await api.get('/restaurant');
};

export const restaurantUpdateRequest = async ({
  id,
  name,
  cost,
  status,
  notifyAfter,
  cancelAt,
}) => {
  return await api.put(`/restaurant/${id}`, {
    name,
    cost,
    status,
    notifyAfter,
    cancelAt,
  });
};

export const restaurantDeleteRequest = async ({id}) => {
  return await api.delete(`/restaurant/${id}`);
};

export const restaurantCreateRequest = async ({
  name,
  cost,
  notifyAfter,
  cancelAt,
}) => {
  return await api.post('/restaurant', {name, cost, notifyAfter, cancelAt});
};

export const menuGetRequest = async ({filter}) => {
  return await api.get('/menu', {params: filter});
};

export const menuPostRequest = async ({menu, restaurantId}) => {
  return await api.post('/menu', {menu, restaurantId});
};

export const menuDeleteRequest = async ({_menuId}) => {
  return await api.delete(`/menu/${_menuId}`);
};

export const notifyUsersRequest = async ({menuId}) => {
  return await api.post(`/menu/notify/${menuId}`);
};

export const orderCreateRequest = async ({
  menuId,
  userId,
  type,
  menuOptions,
}) => {
  return await api.post('/order', {menuId, userId, type, menuOptions});
};

export const orderGetRequest = async ({filter}) => {
  return await api.get('/order', {params: filter});
};

export const orderUpdateRequest = async ({
  orderId,
  type,
  status,
  userId,
  menuId,
  menuOptions,
}) => {
  return await api.put(`/order/${orderId}`, {
    type,
    status,
    userId,
    menuId,
    menuOptions,
  });
};

export const createDeviceRequest = async ({fcmToken}) => {
  return await api.post('/device', {fcmToken});
};
