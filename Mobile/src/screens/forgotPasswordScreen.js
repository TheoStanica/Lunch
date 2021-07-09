import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const ForgotPasswordScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello Forgot Password</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ForgotPasswordScreen;
