import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import LunchLogo from '../assets/images/Lunch';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FBBC00" />
      <LunchLogo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBBC00',
  },
});

export default LoadingScreen;
