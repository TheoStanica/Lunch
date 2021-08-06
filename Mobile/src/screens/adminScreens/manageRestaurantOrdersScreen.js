import {useNavigationState} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const ManageRestaurantOrdersScreen = ({navigation, route}) => {
  const navigator = useNavigationState(state => state.routes);

  console.log(navigation, route);
  console.log(navigator);
  console.log(navigator[0].params.statistics);

  return (
    <View>
      <Text>Manage Restaurant Orders Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ManageRestaurantOrdersScreen;
