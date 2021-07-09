import * as yup from 'yup';

const emailValidationSchema = yup.object({
  email: yup
    .string('Enter your email.')
    .email('Enter a valid email.')
    .required('Email is required.'),
});

const passwordValidationSchema = yup.object({
  password: yup
    .string('Enter your password.')
    .min(8, 'Password must have a minimum length of 8.')
    .matches(/([A-Z])+/, 'Password must have at least one upper letter.')
    .matches(/[a-z]+/, 'Password must have at least one lower letter.')
    .matches(/\d+/, 'Password must have at least one digit.')
    .matches(/[@$!%*?&]+/, 'Password must have at least one special character.')
    .required('Password is required.'),
  retypePassword: yup
    .string('Retype your password.')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Retype password is required.'),
});
const loginValidationSchema = yup.object({
  email: yup
    .string('Enter your email.')
    .email('Enter a valid email.')
    .required('Email is required.'),
  password: yup
    .string('Enter your password.')
    .min(8, 'Password must have a minimum length of 8.')
    .matches(/([A-Z])+/, 'Password must have at least one upper letter.')
    .matches(/[a-z]+/, 'Password must have at least one lower letter.')
    .matches(/\d+/, 'Password must have at least one digit.')
    .matches(/[@$!%*?&]+/, 'Password must have at least one special character.')
    .required('Password is required.'),
});

const registerValidationSchema = yup.object({
  email: yup
    .string('Enter your email.')
    .email('Enter a valid email.')
    .required('Email is required.'),
  password: yup
    .string('Enter your password.')
    .min(8, 'Password must have a minimum length of 8.')
    .matches(/([A-Z])+/, 'Password must have at least one upper letter.')
    .matches(/[a-z]+/, 'Password must have at least one lower letter.')
    .matches(/\d+/, 'Password must have at least one digit.')
    .matches(/[@$!%*?&]+/, 'Password must have at least one special character.')
    .required('Password is required.'),
  retypePassword: yup
    .string('Retype your password.')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Retype password is required.'),
  fullname: yup
    .string('Enter your full name.')
    .matches(/^[A-Z][- a-zA-Z]+$/, 'Enter a valid full name.')
    .required('Full name is required.'),
});

module.exports = {
  emailValidationSchema,
  loginValidationSchema,
  registerValidationSchema,
  passwordValidationSchema,
};
