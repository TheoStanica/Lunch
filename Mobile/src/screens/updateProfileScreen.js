import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import TextInputField from '../components/textInputField';
import HideKeyboard from '../components/hideKeyboard';
import {Formik} from 'formik';
import {updateValidationSchema} from '../assets/bodyValidation/userValidation';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../redux/thunks/userThunks';
import ActionButton from '../components/actionButton';

const UpdateProfileScreen = () => {
  const userReducer = useSelector(state => state.userReducer);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRetypePassword, setHideRetypePassword] = useState(true);
  const dispatch = useDispatch();

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            <Formik
              validationSchema={updateValidationSchema}
              initialValues={{
                email: userReducer.email,
                password: undefined,
                retypePassword: undefined,
                fullname: userReducer.fullname,
              }}
              onSubmit={values => {
                if (values.email === userReducer.email)
                  values.email = undefined;

                dispatch(
                  updateUser({
                    email: values.email,
                    password: values.password,
                    fullname: values.fullname,
                  }),
                );
              }}>
              {({values, handleChange, errors, handleSubmit}) => (
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
                  <ActionButton text="Update" onPress={handleSubmit} />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
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
});

export default UpdateProfileScreen;
