import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import * as yup from 'yup';
import HideKeyboard from '../components/hideKeyboard';

import TextInputField from '../components/textInputField';

const LoginScreen = ({navigation, theme}) => {
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
    <HideKeyboard>
      <SafeAreaView style={styles.container(theme)}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'margin'}>
          <ScrollView>
            <View style={styles.contentContainer}>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={values =>
                  dispatch(
                    loginUser({email: values.email, password: values.password}),
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
                    <SafeAreaView>
                      <Button
                        mode="contained"
                        disabled={!isValid}
                        onPress={handleSubmit}
                        style={styles.glassButton}
                        color="#fff7">
                        <Text style={styles.buttonText}>Login</Text>
                      </Button>
                    </SafeAreaView>
                  </>
                )}
              </Formik>
              <SafeAreaView>
                <Button onPress={() => {}}>
                  <Text style={styles.buttonText}>Forgot Password</Text>
                </Button>
              </SafeAreaView>
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
});

export default withTheme(LoginScreen);
