import React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import Statistics from '../../components/statistics';

const UerRestaurantOrdersScreen = ({route}) => {
  const {user} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Title style={styles.fullnameTitle}>
        {user.item ? user.item[0] : {}}
      </Title>
      <FlatList
        data={Object.entries(user.item ? user.item[1] : {})}
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
  fullnameTitle: {
    alignSelf: 'center',
    padding: 10,
  },
});

export default UerRestaurantOrdersScreen;
