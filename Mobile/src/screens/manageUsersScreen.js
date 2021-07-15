import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {getAllUsers} from '../redux/thunks/userThunks';
import {useDispatch} from 'react-redux';

import AdminField from '../components/adminField';

const ManageUsersScreen = () => {
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
            <AdminField
              title={item.fullname}
              description={item.email}
              icon="account-edit"
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManageUsersScreen;
