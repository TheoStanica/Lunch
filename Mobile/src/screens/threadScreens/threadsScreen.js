import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, SafeAreaView, Text} from 'react-native';

const ThreadsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Threads Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
});

export default ThreadsScreen;
