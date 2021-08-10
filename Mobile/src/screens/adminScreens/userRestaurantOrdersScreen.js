import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import RestaurantOrders from '../../components/restaurantOrders';

const UerRestaurantOrdersScreen = ({route}) => {
  const {user} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.fullnameTitle}>
        {user.item ? user.item[0] : {}}
      </Title>
      <RestaurantOrders data={Object.entries(user.item ? user.item[1] : {})} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  fullnameTitle: {
    alignSelf: 'center',
    padding: 10,
  },
});

export default UerRestaurantOrdersScreen;
