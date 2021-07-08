import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../redux/thunks/userThunks';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.text}>
      <Text>Home</Text>
      <Button onPress={() => dispatch(logoutUser())}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default HomeScreen;
