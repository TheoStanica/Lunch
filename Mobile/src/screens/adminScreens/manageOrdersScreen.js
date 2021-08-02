import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

const ManageOrdersScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Manage Orders Sceen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
});

export default ManageOrdersScreen;
