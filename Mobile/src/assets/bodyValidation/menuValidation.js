import * as yup from 'yup';

export const menuValidationSchema = yup.object({
  createdMenu: yup
    .array()
    .of(
      yup.object({
        courseCategory: yup.string().required('Please enter a course title'),
        courses: yup
          .array()
          .of(
            yup.object({
              description: yup.string().required('Please enter a dish name'),
              requiredType: yup
                .string()
                .oneOf(['restaurant', 'takeaway', 'both']),
            }),
          )
          .min(1, 'Please add at least one dish'),
      }),
    )
    .min(1, 'Please create a menu before submitting'),
});
