import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../redux/thunks/userThunks';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
      <Button onPress={() => dispatch(logoutUser())}>Logout</Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
