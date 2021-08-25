import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {TextInput, List, Switch, Subheading, Divider} from 'react-native-paper';
import {Formik} from 'formik';
import {updateValidationSchema} from '../../assets/bodyValidation/userValidation';
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../../redux/thunks/userThunks';
import ActionButton from '../../components/actionButton';
import TextInputField from '../../components/textInputField';
import HideKeyboard from '../../components/hideKeyboard';
import DateTimePicker from '../../components/timePicker';
import moment from 'moment';
import CategoryContainer from '../../components/categoryContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <ScrollView contentContainerStyle={styles.flex}>
            <Formik
              validationSchema={updateValidationSchema}
              initialValues={{
                email: userReducer.email,
                password: undefined,
                retypePassword: undefined,
                fullname: userReducer.fullname,
                isReminderOn: userReducer.isReminderOn,
                remindAt: userReducer.remindAt,
              }}
              onSubmit={values => {
                if (values.email === userReducer.email)
                  values.email = undefined;
                const data = {
                  email: values.email,
                  password: values.password,
                  fullname: values.fullname,
                  isReminderOn: values.isReminderOn,
                  remindAt: values.remindAt,
                };
                dispatch(updateUser(data, sendSuccessMessage));
              }}
              style={{backgroundColor: 'red'}}>
              {({
                values,
                setFieldValue,
                handleChange,
                errors,
                touched,
                handleBlur,
                handleSubmit,
              }) => (
                <View style={styles.formContainer}>
                  <View>
                    <CategoryContainer title="Personal Information">
                      <View style={styles.personalInformationContainer}>
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
                      </View>
                    </CategoryContainer>
                    <CategoryContainer title="Notifications">
                      <Subheading style={styles.subheading}>
                        Place order
                      </Subheading>
                      <Divider style={styles.divider} />
                      <List.Item
                        title="Receive reminders"
                        right={() => (
                          <Switch
                            value={values.isReminderOn ? true : false}
                            color="#4A6572"
                            onValueChange={() =>
                              setFieldValue(
                                'isReminderOn',
                                !values.isReminderOn,
                              )
                            }
                          />
                        )}
                      />
                      <DateTimePicker
                        title="Remind Me At"
                        description={values.remindAt}
                        mode="time"
                        date={new Date(`01/01/1970 ${values.remindAt}`)}
                        onConfirm={date =>
                          setFieldValue('remindAt', moment(date).format('LT'))
                        }
                      />
                    </CategoryContainer>
                  </View>
                  <ActionButton text="Update" onPress={handleSubmit} />
                </View>
              )}
            </Formik>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
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
  personalInformationContainer: {
    paddingHorizontal: 15,
  },
  subheading: {
    marginLeft: 15,
  },
  divider: {
    backgroundColor: '#000',
    marginHorizontal: 15,
  },
});

export default UpdateProfileScreen;
