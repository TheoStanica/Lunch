import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import {Formik} from 'formik';
import {
  emailValidationSchema,
  passwordValidationSchema,
} from '../assets/bodyValidation/userValidation';

import TextInputField from '../components/textInputField';

const ForgotPasswordScreen = ({theme}) => {
  return (
    <SafeAreaView style={styles.container(theme)}>
      <View style={styles.contentContainer}>
        <Formik
          validationSchema={emailValidationSchema}
          initialValues={{
            email: '',
          }}
          onSubmit={values => dispatch(loginUser({email: values.email}))}>
          {({values, handleChange, errors, isValid, handleSubmit}) => (
            <>
              <TextInputField
                label="Email"
                value={values.email}
                errors={errors.email}
                handleChange={handleChange}
                field="email"
              />
              <Button
                mode="contained"
                disabled={!isValid}
                onPress={handleSubmit}
                style={styles.glassButton}
                color="#fff7">
                <Text style={styles.buttonText}>Send Email</Text>
              </Button>
            </>
          )}
        </Formik>
        <Formik
          validationSchema={passwordValidationSchema}
          initialValues={{
            password: '',
            retypePassword: '',
          }}
          onSubmit={values =>
            dispatch(
              loginUser({
                password: values.password,
                retypePassword: values.retypePassword,
              }),
            )
          }>
          {({values, handleChange, errors, isValid, handleSubmit}) => (
            <>
              <TextInputField
                label="New Password"
                value={values.password}
                errors={errors.password}
                handleChange={handleChange}
                field="password"
              />
              <TextInputField
                label="Retype New Password"
                value={values.retypePassword}
                errors={errors.retypePassword}
                handleChange={handleChange}
                field="retypePassword"
              />
              <Button
                mode="contained"
                disabled={!isValid}
                onPress={handleSubmit}
                style={styles.glassButton}
                color="#fff7">
                <Text style={styles.buttonText}>Reset Password</Text>
              </Button>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.primary,
    justifyContent: 'flex-end',
  }),
  buttonText: {
    color: 'black',
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 40,
  },
  contentContainer: {
    padding: 25,
    paddingBottom: 100,
  },
});

export default withTheme(ForgotPasswordScreen);
