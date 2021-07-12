import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const UpdateProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Update Profile</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UpdateProfileScreen;
