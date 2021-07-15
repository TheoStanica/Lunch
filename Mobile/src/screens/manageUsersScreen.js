import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const ManageUsersScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Manage Users</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManageUsersScreen;
