import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {registerUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import {registerValidationSchema} from '../assets/bodyValidation/userValidation';

import TextInputField from '../components/textInputField';

const RegisterScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
