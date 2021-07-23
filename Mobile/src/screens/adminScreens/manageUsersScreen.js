import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import {getAllUsers, deleteUser} from '../../redux/thunks/userThunks';
import {useDispatch, useSelector} from 'react-redux';

import AdminField from '../../components/adminField';

const ManageUsersScreen = ({navigation}) => {
  const userReducer = useSelector(state => state.userReducer);
  const {allUsers, allUsersById} = useSelector(state => state.allUsersReducer);
  const [isFetching, setIsFetching] = useState(true);
  const [row, setRow] = useState([]);
  const [previousOpenedRow, setPreviousOpenedRow] = useState(null);
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
              index={_userId}
              onDelete={() => dispatch(deleteUser({_userId}))}
              row={row}
              onUpdateRow={row => setRow(row)}
              prevOpenedRow={previousOpenedRow}
              onUpdatePrevOpenedRow={prevRow => setPreviousOpenedRow(prevRow)}
            />
          ) : (
            <></>
          );
        }}
        onRefresh={onRefresh}
        refreshing={isFetching}
        showsVerticalScrollIndicator={false}
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
