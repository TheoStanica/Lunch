import * as yup from 'yup';

const generateObject = array => {
  const obj = {};
  array.map(
    el =>
      (obj[`${el}`] = yup
        .number()
        .required(`You must select at least one dish from ${el}`)),
  );
  return obj;
};

export const createOrderValidationSchema = array => {
  return yup.object({
    selectedMenu: yup.object(generateObject(array)),
  });
};
