import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import RestaurantOrders from '../../components/restaurantOrders';

const ManageRestaurantOrdersScreen = ({route}) => {
  const {statistics} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantOrders data={Object.entries(statistics.restaurants)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
});

export default ManageRestaurantOrdersScreen;
