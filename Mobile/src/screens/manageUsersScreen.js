import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native';
import {getAllUsers} from '../redux/thunks/userThunks';
import {useDispatch} from 'react-redux';
import {Modal} from 'react-native-paper';
import {Formik} from 'formik';
import {registerValidationSchema} from '../assets/bodyValidation/userValidation';

import DropDownPicker from 'react-native-dropdown-picker';
import AdminField from '../components/adminField';
import TextInputField from '../components/textInputField';
import ActionButton from '../components/actionButton';

const ManageUsersScreen = () => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [roleValue, setRoleValue] = useState(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllUsers({
        onFinish: users => {
          if (users) {
            setUsers(users);
          }
        },
      }),
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View style={styles.container}>
              <AdminField
                title={item.fullname}
                description={item.email}
                icon="account-edit"
                onPress={() => {
                  setSelectedUser(item);
                  setRoleValue(item.role);
                }}
              />
            </View>
          );
        }}
      />
      <Modal
        visible={selectedUser !== ''}
        onDismiss={() => {
          setSelectedUser('');
          setRoleValue(null);
          setOpenDropDown(false);
        }}
        contentContainerStyle={{
          padding: 20,
          marginHorizontal: 20,
          backgroundColor: 'white',
        }}>
        <Formik
          validationSchema={registerValidationSchema}
          initialValues={{
            email: selectedUser.email,
            fullname: selectedUser.fullname,
            role: selectedUser.role,
          }}
          onSubmit={values => {
            values.role = roleValue;
            dispatch(
              registerUser({
                email: values.email,
                fullname: values.fullname,
                role: values.role,
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
                label="Full Name"
                value={values.fullname}
                errors={errors.fullname}
                handleChange={handleChange}
                field="fullname"
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
              <View style={styles.containerButtons}>
                <ActionButton text="Edit" style={styles.container} />
                <ActionButton text="Delete" style={styles.container} />
              </View>
            </>
          )}
        </Formik>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButtons: {
    flexDirection: 'row',
  },
});

export default ManageUsersScreen;
