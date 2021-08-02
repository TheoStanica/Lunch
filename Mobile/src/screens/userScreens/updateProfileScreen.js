import React, {useState} from 'react';
import {SafeAreaView, View, ScrollView, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import TextInputField from '../../components/textInputField';
import HideKeyboard from '../../components/hideKeyboard';
import {Formik} from 'formik';
import {updateValidationSchema} from '../../assets/bodyValidation/userValidation';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../../redux/thunks/userThunks';
import ActionButton from '../../components/actionButton';

const UpdateProfileScreen = ({navigation}) => {
  const userReducer = useSelector(state => state.userReducer);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRetypePassword, setHideRetypePassword] = useState(true);
  const dispatch = useDispatch();

  const sendSuccessMessage = () => {
    navigation.reset({
      routes: [
        {name: 'ProfileScreen'},
        {
          name: 'MessageScreen',
          params: {message: 'Account updated!'},
        },
      ],
    });
  };

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.flex}>
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
                  updateUser(
                    {
                      email: values.email,
                      password: values.password,
                      fullname: values.fullname,
                    },
                    sendSuccessMessage,
                  ),
                );
              }}
              style={{backgroundColor: 'red'}}>
              {({values, handleChange, errors, handleSubmit}) => (
                <View style={styles.formContainer}>
                  <View>
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
                  </View>
                  <ActionButton text="Update" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </SafeAreaView>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  flex: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
    flexGrow: 1,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default UpdateProfileScreen;
