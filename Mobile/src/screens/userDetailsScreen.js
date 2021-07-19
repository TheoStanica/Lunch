import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {updateUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import {updateValidationSchema} from '../assets/bodyValidation/userValidation';
import {useDispatch, useSelector} from 'react-redux';

import DropDownPicker from 'react-native-dropdown-picker';
import TextInputField from '../components/textInputField';
import ActionButton from '../components/actionButton';

const UserDetailsScreen = ({route, navigation}) => {
  const {user} = route.params;
  const [openDropDown, setOpenDropDown] = useState(false);
  const [roleValue, setRoleValue] = useState(user.role);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
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
            <Text style={styles.title}>Update User</Text>
            <TextInputField
              label="Email"
              value={values.email}
              errors={errors.email}
              handleChange={handleChange}
              field="email"
            />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserDetailsScreen;
