import * as yup from 'yup';

export const restaurantValidationSchema = yup.object({
  name: yup
    .string('Please enter a restaurant name.')
    .required('Restaurant name is required.'),
  cost: yup
    .number()
    .positive('Cost must be a positive number.')
    .required('Cost is required.')
    .typeError('Cost must be a number'),
});
