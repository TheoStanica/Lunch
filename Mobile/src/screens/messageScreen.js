import React from 'react';
import {View, StyleSheet, Platform, StatusBar, Text} from 'react-native';
import LunchLogo from '../assets/images/LunchLogo';

const MessageScreen = ({route}) => {
  const {image, message} = route.params;
  return (
    <View style={styles.container}>
      {Platform.OS !== 'ios' ? <StatusBar backgroundColor="#FBBC00" /> : null}
      {image ? image : <LunchLogo />}
      <Text style={styles.text}>{message ? message : 'Success'}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBBC00',
    padding: 20,
  },
  text: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MessageScreen;
