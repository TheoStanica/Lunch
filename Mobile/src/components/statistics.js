import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import SummaryField from './summaryField';

const Statistics = ({
  totalOrders,
  totalRestaurantOrders,
  totalTakeawayOrders,
  totalTakeawayCost,
  totalCost,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SummaryField text={`Total orders: ${totalOrders}`} icon="dropbox" />
      <SummaryField
        text={`Total restaurant orders: ${totalRestaurantOrders}`}
        icon="food-fork-drink"
      />
      <SummaryField
        text={`Total takeaway orders: ${totalTakeawayOrders}`}
        icon="package-variant"
      />
      <SummaryField
        text={`Total takeaway cost: ${totalTakeawayCost}`}
        icon="currency-usd"
      />
      <SummaryField text={`Total cost: ${totalCost}`} icon="currency-usd" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
});

export default Statistics;
