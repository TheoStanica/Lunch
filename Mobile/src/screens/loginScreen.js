import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  KeyboardAvoidingView,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {loginUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import {loginValidationSchema} from '../assets/bodyValidation/userValidation';

import TextInputField from '../components/textInputField';

const LoginScreen = ({navigation, theme}) => {
  const dispatch = useDispatch();

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container(theme)}>
        <KeyboardAvoidingView behavior="padding">
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
              <Button
                onPress={() => {
                  navigation.navigate('ForgotPasswordScreen');
                }}>
                <Text style={styles.buttonText}>Forgot Password</Text>
              </Button>
            </SafeAreaView>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
