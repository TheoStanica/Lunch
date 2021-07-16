import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native';
import {getAllUsers, updateUser} from '../redux/thunks/userThunks';
import {useDispatch, useSelector} from 'react-redux';
import {Modal} from 'react-native-paper';
import {Formik} from 'formik';
import {updateValidationSchema} from '../assets/bodyValidation/userValidation';

import DropDownPicker from 'react-native-dropdown-picker';
import AdminField from '../components/adminField';
import TextInputField from '../components/textInputField';
import ActionButton from '../components/actionButton';

const ManageUsersScreen = () => {
  const userReducer = useSelector(state => state.userReducer);
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
  }, [users]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return item.id !== userReducer.id ? (
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
          ) : (
            <></>
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
          validationSchema={updateValidationSchema}
          initialValues={{
            email: selectedUser.email,
            fullname: selectedUser.fullname,
            role: selectedUser.role,
          }}
          onSubmit={values => {
            values.role = roleValue;
            if (values.email === selectedUser.email) delete values.email;

            dispatch(
              updateUser({
                _userId: selectedUser.id,
                email: values.email,
                fullname: values.fullname,
                role: values.role,
              }),
            );

            setSelectedUser('');
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
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ManageUsersScreen;
