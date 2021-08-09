import React from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import ProfileField from '../../components/profileField';

const UsersGoingScreen = ({route}) => {
  const {menuId} = route.params;
  const {menusById, email} = useSelector(state => ({
    ...state.menuReducer,
    ...state.userReducer,
  }));

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeContainer}>
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
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#fff1ca',
  },
  safeContainer: {
    flex: 1,
  },
});

export default UsersGoingScreen;
