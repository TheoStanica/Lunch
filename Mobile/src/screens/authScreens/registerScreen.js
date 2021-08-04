import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, TextInput, withTheme} from 'react-native-paper';
import {registerUser} from '../../redux/thunks/userThunks';
import {Formik} from 'formik';
import {registerValidationSchema} from '../../assets/bodyValidation/userValidation';

import TextInputField from '../../components/textInputField';
import HideKeyboard from '../../components/hideKeyboard';

const RegisterScreen = ({navigation, theme}) => {
  const [message, setMessage] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRetypePassword, setHideRetypePassword] = useState(true);
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
                      onFinish: error => {
                        if (!error) {
                          setMessage(
                            'Account created! Please check your email to activate your account.',
                          );
                        }
                      },
                    }),
                  );
                }}>
                {({
                  values,
                  handleChange,
                  isValid,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <>
                    <TextInputField
                      label="Email"
                      value={values.email}
                      errors={errors.email}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched.email}
                      field="email"
                    />
                    <TextInputField
                      label="Password"
                      value={values.password}
                      errors={errors.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched.password}
                      secureTextEntry={hidePassword}
                      right={
                        <TextInput.Icon
                          name={hidePassword ? 'eye-off' : 'eye'}
                          size={20}
                          onPress={() => setHidePassword(!hidePassword)}
                        />
                      }
                      field="password"
                    />
                    <TextInputField
                      label="Retype Password"
                      value={values.retypePassword}
                      errors={errors.retypePassword}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched.retypePassword}
                      secureTextEntry={hideRetypePassword}
                      right={
                        <TextInput.Icon
                          name={hideRetypePassword ? 'eye-off' : 'eye'}
                          size={20}
                          onPress={() =>
                            setHideRetypePassword(!hideRetypePassword)
                          }
                        />
                      }
                      field="retypePassword"
                    />
                    <TextInputField
                      label="Full Name"
                      value={values.fullname}
                      errors={errors.fullname}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      touched={touched.fullname}
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
