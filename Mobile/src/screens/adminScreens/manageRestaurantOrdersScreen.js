import React from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {Title} from 'react-native-paper';
import Statistics from '../../components/statistics';

const ManageRestaurantOrdersScreen = () => {
  const navigator = useNavigationState(state => state.routes);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.entries(
          navigator.filter(nav => nav.name === 'ManageOrdersScreen')[0].params
            .statistics.restaurants,
        )}
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
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF1CA',
  },
  title: {
    alignSelf: 'center',
  },
});

export default ManageRestaurantOrdersScreen;
