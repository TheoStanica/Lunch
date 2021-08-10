import React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import Statistics from './statistics';

const RestaurantOrders = ({data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item}
      renderItem={restaurant => (
        <SafeAreaView>
          <Title style={styles.title}>{restaurant.item[0]}</Title>
          <Statistics
            totalOrders={restaurant.item[1].totalOrders}
            totalRestaurantOrders={restaurant.item[1].totalRestaurantOrders}
            totalTakeawayOrders={restaurant.item[1].totalTakeawayOrders}
            totalTakeawayCost={restaurant.item[1].totalTakeawayCost}
            totalCost={restaurant.item[1].totalCost}
          />
        </SafeAreaView>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
  },
});

export default RestaurantOrders;
