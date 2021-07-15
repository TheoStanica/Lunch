import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const ManageRestaurantsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Manage Restaurants</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManageRestaurantsScreen;
