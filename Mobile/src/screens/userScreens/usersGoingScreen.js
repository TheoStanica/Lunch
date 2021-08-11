import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {Title} from 'react-native-paper';
import ProfileField from '../../components/profileField';

const UsersGoingScreen = ({route}) => {
  const {menuId} = route.params;
  const {menusById, email} = useSelector(state => ({
    ...state.menuReducer,
    ...state.userReducer,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {menusById[menuId].usersGoing.length !== 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {menusById[menuId].usersGoing.map(user => (
            <ProfileField
              key={user.email}
              title={email === user.email ? 'You' : user.fullname}
              paragraph={user.email}
              iconColor="#4A6572"
              icon="account-circle-outline"
            />
          ))}
        </ScrollView>
      ) : (
        <SafeAreaView style={styles.nobodyGoingText}>
          <Title>Nobody is going to the restaurant.</Title>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff1ca',
  },
  nobodyGoingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UsersGoingScreen;
