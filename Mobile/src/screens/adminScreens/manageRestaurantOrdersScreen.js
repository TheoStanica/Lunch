import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {Title} from 'react-native-paper';
import SummaryField from '../../components/summaryField';

const ManageRestaurantOrdersScreen = () => {
  const navigator = useNavigationState(state => state.routes);

  return (
    <SafeAreaView>
      <FlatList
        data={Object.entries(
          navigator.filter(nav => nav.name === 'ManageOrdersScreen')[0].params
            .statistics.restaurants,
        )}
        keyExtractor={item => item}
        renderItem={restaurant => (
          <SafeAreaView>
            <Title>{restaurant.item[0]}</Title>
            <SummaryField
              text={`Total orders: ${restaurant.item[1].totalOrders}`}
              icon="dropbox"
            />
            <SummaryField
              text={`Total restaurant orders: ${restaurant.item[1].totalRestaurantOrders}`}
              icon="food-fork-drink"
            />
            <SummaryField
              text={`Total takeaway orders: ${restaurant.item[1].totalTakeawayOrders}`}
              icon="package-variant"
            />
            <SummaryField
              text={`Total takeaway cost: ${restaurant.item[1].totalTakeawayCost}`}
              icon="currency-usd"
            />
            <SummaryField
              text={`Total cost: ${restaurant.item[1].totalCost}`}
              icon="currency-usd"
            />
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ManageRestaurantOrdersScreen;
