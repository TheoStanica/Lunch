import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  View,
} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {registerUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import {registerValidationSchema} from '../assets/bodyValidation/userValidation';

import TextInputField from '../components/textInputField';
import HideKeyboard from '../components/hideKeyboard';

const RegisterScreen = ({theme}) => {
  const {message} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container(theme)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'margin'}>
          <ScrollView>
            <View style={styles.contentContainer}>
              <Formik
                validationSchema={registerValidationSchema}
                initialValues={{
                  email: '',
                  password: '',
                  retypePassword: '',
                  fullname: '',
                }}
                onSubmit={values => {
                  dispatch(
                    registerUser({
                      email: values.email,
                      password: values.password,
                      fullname: values.fullname,
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
                    <Button
                      mode="contained"
                      disabled={!isValid}
                      onPress={handleSubmit}
                      style={styles.glassButton}
                      color="#fff7">
                      <Text style={styles.buttonText}>Register</Text>
                    </Button>
                    {message ? (
                      <Text style={styles.successMessage}>{message}</Text>
                    ) : null}
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </HideKeyboard>
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
  successMessage: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default withTheme(RegisterScreen);
