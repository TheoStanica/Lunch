import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {getAllUsers, deleteUser} from '../redux/thunks/userThunks';
import {useDispatch, useSelector} from 'react-redux';

import AdminField from '../components/adminField';

const ManageUsersScreen = ({navigation}) => {
  const userReducer = useSelector(state => state.userReducer);
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
            <AdminField
              title={item.fullname}
              description={item.email}
              icon="account-edit"
              onEdit={() => {
                navigation.navigate('UserDetailsScreen', {
                  user: item,
                });
              }}
              onDelete={() => dispatch(deleteUser({_userId: item.id}))}
            />
          ) : (
            <></>
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
