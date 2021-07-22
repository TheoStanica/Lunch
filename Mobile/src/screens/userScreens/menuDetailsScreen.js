import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const MenuDetailsScreen = ({route}) => {
  const {menuId} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text>Menu View Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MenuDetailsScreen;
