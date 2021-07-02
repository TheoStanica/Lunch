import axiosInstance from '../../api/buildClient';

export const loginRequest = async ({email, password}) => {
  return await axiosInstance.post('/user/login', {email, password});
};

export const registerRequest = async ({email, password, fullname}) => {
  return await axiosInstance.post('/user/register', {
    email,
    password,
    fullname,
  });
};
