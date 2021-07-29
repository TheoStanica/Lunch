import React from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';

import ActionButton from '../../components/actionButton';

const AdminScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Admin Panel</Text>
        <ActionButton
          style={styles.button}
          text="Manage users"
          onPress={() => navigation.navigate('ManageUsersScreen')}
        />
        <ActionButton
          style={styles.button}
          text="Manage restaurants"
          onPress={() => navigation.navigate('ManageRestaurantsScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  button: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
  },
});

export default AdminScreen;
