import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import {updateUser} from '../redux/thunks/userThunks';
import {Formik} from 'formik';
import {updateValidationSchema} from '../assets/bodyValidation/userValidation';

import DropDownPicker from 'react-native-dropdown-picker';
import TextInputField from '../components/textInputField';
import ActionButton from '../components/actionButton';

const UserDetailsScreen = ({route}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [roleValue, setRoleValue] = useState(null);
  const {user} = route.params;

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

          setuser('');
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
            <View style={styles.containerButtons}>
              <ActionButton
                text="Edit"
                style={styles.container}
                onPress={handleSubmit}
              />
              <ActionButton text="Delete" style={styles.container} />
            </View>
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
