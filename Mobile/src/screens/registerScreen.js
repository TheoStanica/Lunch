import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {registerUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import * as yup from 'yup';

import TextInputField from '../components/textInputField';

const RegisterScreen = () => {
  const dispatch = useDispatch();

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
      .matches(
        /[@$!%*?&]+/,
        'Password must have at least one special character.',
      )
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

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{
          email: '',
          password: '',
          retypePassword: '',
          fullname: '',
        }}
        onSubmit={values =>
          dispatch(
            registerUser({
              email: values.email,
              password: values.password,
              fullname: values.fullname,
            }),
          )
        }>
        {({values, handleChange, errors, isValid, handleSubmit}) => (
          <>
            <TextInputField
              label="Email"
              value={values.email}
              errors={errors.email}
              handleChange={handleChange}
              field="email"
            />
            <TextInputField
              label="Password"
              value={values.password}
              errors={errors.password}
              handleChange={handleChange}
              secureTextEntry={true}
              field="password"
            />
            <TextInputField
              label="Retype Password"
              value={values.retypePassword}
              errors={errors.retypePassword}
              handleChange={handleChange}
              secureTextEntry={true}
              field="retypePassword"
            />
            <TextInputField
              label="Full Name"
              value={values.fullname}
              errors={errors.fullname}
              handleChange={handleChange}
              field="fullname"
            />
            <Button mode="outlined" disabled={!isValid} onPress={handleSubmit}>
              Register
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    fontSize: 12,
    color: '#FF0D10',
  },
});

export default RegisterScreen;
