import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.text}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
  },
});

export default HomeScreen;
