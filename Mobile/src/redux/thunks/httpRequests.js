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

export const forgotPassword = async ({email, password, token}) => {
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

export const activateAccount = async ({activationToken}) => {
  return await axiosInstance.get(`/user/activate/${activationToken}`);
};
