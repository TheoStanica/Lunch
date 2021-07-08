import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import * as yup from 'yup';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

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
      .matches(
        /[@$!%*?&]+/,
        'Password must have at least one special character.',
      )
      .required('Password is required.'),
  });

  return (
    <View style={styles.text}>
      <Text>Login</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={values =>
          dispatch(loginUser({email: values.email, password: values.password}))
        }>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <>
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
            />
            {touched.email && errors.email && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.email}
              </Text>
            )}
            <TextInput
              label="Password"
              type="password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
            />
            {touched.password && errors.password && (
              <Text style={{fontSize: 12, color: '#FF0D10'}}>
                {errors.password}
              </Text>
            )}
            <Button mode="outlined" disabled={!isValid} onPress={handleSubmit}>
              Login
            </Button>
          </>
        )}
      </Formik>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Register
      </Button>
      <Button mode="outlined" onPress={() => {}}>
        Forgot Password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default LoginScreen;
