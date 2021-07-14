import React, {useState} from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import TextInputField from '../components/textInputField';
import HideKeyboard from '../components/hideKeyboard';
import {Formik} from 'formik';
import {updateValidationSchema} from '../assets/bodyValidation/userValidation';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../redux/thunks/userThunks';

const UpdateProfileScreen = () => {
  const userReducer = useSelector(state => state.userReducer);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRetypePassword, setHideRetypePassword] = useState(true);
  const dispatch = useDispatch();

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'margin'}>
          <ScrollView>
            <View style={styles.contentContainer}>
              <Formik
                validationSchema={updateValidationSchema}
                initialValues={{
                  email: userReducer.email,
                  password: undefined,
                  retypePassword: null,
                  fullname: userReducer.fullname,
                }}
                onSubmit={values =>
                  dispatch(
                    updateUser({
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
                      field="fullname"
                    />
                    <SafeAreaView>
                      <Button
                        mode="contained"
                        disabled={!isValid}
                        onPress={handleSubmit}
                        style={styles.glassButton}
                        color="#fff7">
                        <Text style={styles.buttonText}>Update</Text>
                      </Button>
                    </SafeAreaView>
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
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 25,
    paddingBottom: 100,
  },
  glassButton: {marginVertical: 8, shadowColor: 'transparent'},
  buttonText: {
    color: 'black',
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 40,
  },
});

export default UpdateProfileScreen;
