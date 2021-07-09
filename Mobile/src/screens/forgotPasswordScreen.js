import React from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import {Formik} from 'formik';
import {
  emailValidationSchema,
  passwordValidationSchema,
} from '../assets/bodyValidation/userValidation';
import {useDispatch, useSelector} from 'react-redux';

import TextInputField from '../components/textInputField';
import {forgotPasswordUser} from '../redux/thunks/userThunks';

const ForgotPasswordScreen = ({theme, route}) => {
  const {message} = useSelector(state => state.userReducer);
  const token = route?.params?._token;
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container(theme)}>
      <View style={styles.contentContainer}>
        {!token ? (
          <Formik
            validationSchema={emailValidationSchema}
            initialValues={{
              email: '',
            }}
            onSubmit={values => {
              dispatch(forgotPasswordUser({email: values.email}));
              values.email = '';
            }}>
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
        ) : (
          <Formik
            validationSchema={passwordValidationSchema}
            initialValues={{
              password: '',
              retypePassword: '',
            }}
            onSubmit={values =>
              dispatch(
                forgotPasswordUser({
                  password: values.password,
                  token,
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
                  secureTextEntry={true}
                  field="password"
                />
                <TextInputField
                  label="Retype New Password"
                  value={values.retypePassword}
                  errors={errors.retypePassword}
                  handleChange={handleChange}
                  secureTextEntry={true}
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
                {message ? (
                  <Text style={styles.successMessage}>{message}</Text>
                ) : null}
              </>
            )}
          </Formik>
        )}
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
  glassButton: {marginVertical: 8, shadowColor: 'transparent'},
});

export default withTheme(ForgotPasswordScreen);
