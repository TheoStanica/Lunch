import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import RestaurantOrders from '../../components/restaurantOrders';

const ManageRestaurantOrdersScreen = () => {
  const navigator = useNavigationState(state => state.routes);

  return (
    <SafeAreaView style={styles.container}>
      <RestaurantOrders
        data={Object.entries(
          navigator.filter(nav => nav.name === 'ManageOrdersScreen')[0].params
            .statistics.restaurants,
        )}
      />
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
