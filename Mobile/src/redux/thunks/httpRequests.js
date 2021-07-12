import axiosInstance from '../../api/buildClient';

export const userLoginRequest = async ({email, password}) => {
  return await axiosInstance.post('/user/login', {email, password});
};

export const userRegisterRequest = async ({email, password, fullname}) => {
  return await axiosInstance.post('/user/register', {
    email,
    password,
    fullname,
  });
};

export const userForgotPasswordRequest = async ({email, password, token}) => {
  if (email) {
    return await axiosInstance.post('/user/forgotpassword', {
      email,
    });
  } else {
    return await axiosInstance.post(`/user/forgotpassword/${token}`, {
      password,
    });
  }
};
