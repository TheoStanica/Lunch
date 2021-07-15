import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const AdminScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Admin</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AdminScreen;
