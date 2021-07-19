import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {updateUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import {updateValidationSchema} from '../assets/bodyValidation/userValidation';
import {useDispatch} from 'react-redux';

import DropDownPicker from 'react-native-dropdown-picker';
import TextInputField from '../components/textInputField';
import ActionButton from '../components/actionButton';
import HideKeyboard from '../components/hideKeyboard';

const UserDetailsScreen = ({route, navigation}) => {
  const {user} = route.params;
  const [openDropDown, setOpenDropDown] = useState(false);
  const [roleValue, setRoleValue] = useState(user.role);
  const dispatch = useDispatch();

  return (
    <HideKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Formik
            validationSchema={updateValidationSchema}
            initialValues={{
              email: user.email,
              fullname: user.fullname,
              role: user.role,
            }}
            onSubmit={values => {
              values.role = roleValue;
              if (values.email === user.email) delete values.email;

              dispatch(
                updateUser({
                  _userId: user.id,
                  email: values.email,
                  fullname: values.fullname,
                  role: values.role,
                }),
              );
              navigation.goBack();
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
                <View style={styles.dropDownPicker}>
                  <Text style={styles.roleText(openDropDown)}>Role</Text>
                  <DropDownPicker
                    open={openDropDown}
                    value={roleValue}
                    setValue={setRoleValue}
                    setOpen={setOpenDropDown}
                    items={[
                      {label: 'user', value: 'user'},
                      {label: 'admin', value: 'admin'},
                    ]}
                  />
                </View>
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
  roleText: openDropDown => ({
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 10,
    color: openDropDown ? 'black' : 'gray',
    fontSize: 12,
  }),
  dropDownPicker: {
    marginBottom: 12,
  },
});

export default UserDetailsScreen;
