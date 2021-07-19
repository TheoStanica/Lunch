import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {getAllUsers, deleteUser} from '../redux/thunks/userThunks';
import {useDispatch, useSelector} from 'react-redux';

import AdminField from '../components/adminField';

const ManageUsersScreen = ({navigation}) => {
  const userReducer = useSelector(state => state.userReducer);
  const {allUsers, allUsersById} = useSelector(state => state.allUsersReducer);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(getAllUsers(() => setIsFetching(false)));
  };
  useEffect(() => onRefresh(), []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allUsers}
        onRefresh={onRefresh}
        refreshing={isFetching}
        keyExtractor={item => item}
        renderItem={({item: _userId}) => {
          return _userId !== userReducer.id ? (
            <AdminField
              title={allUsersById[_userId].fullname}
              description={allUsersById[_userId].email}
              icon="account-edit"
              onEdit={() => {
                navigation.navigate('UserDetailsScreen', {
                  user: allUsersById[_userId],
                });
              }}
              onDelete={() => dispatch(deleteUser({_userId}))}
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
