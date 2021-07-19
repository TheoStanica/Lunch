import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import {Formik} from 'formik';
import {
  emailValidationSchema,
  passwordValidationSchema,
} from '../assets/bodyValidation/userValidation';
import {useDispatch} from 'react-redux';

import TextInputField from '../components/textInputField';
import {forgotPasswordUser} from '../redux/thunks/userThunks';

const ForgotPasswordScreen = ({theme, route, navigation}) => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      navigation.reset({
        routes: [
          {name: 'AuthScreen'},
          {
            name: 'MessageScreen',
            params: {message},
          },
        ],
      });
    }
  }, [message]);

  return (
    <SafeAreaView style={styles.container(theme)}>
      <View style={styles.contentContainer}>
        {!route?.params?._token ? (
          <Formik
            validationSchema={emailValidationSchema}
            initialValues={{
              email: '',
            }}
            onSubmit={values => {
              dispatch(
                forgotPasswordUser({
                  email: values.email,
                  onFinish: error => {
                    if (!error) {
                      setMessage(
                        'Please check your email to reset your password.',
                      );
                      values.email = '';
                    }
                  },
                }),
              );
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
                  route: route?.params?._token,
                  onFinish: error => {
                    if (!error) {
                      setMessage('Password reseted');
                    }
                  },
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
