import React from 'react';
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import SummaryField from './summaryField';

const Statistics = ({
  totalOrders,
  totalRestaurantOrders,
  totalTakeawayOrders,
  totalTakeawayCost,
  totalCost,
  title,
}) => {
  return (
    <Card style={styles.container} mode="outlined">
      {title ? (
        <Card.Title title={title} titleStyle={{alignSelf: 'center'}} />
      ) : null}
      <SummaryField text={`Total orders: ${totalOrders}`} iconName="dropbox" />
      <SummaryField
        text={`Total restaurant orders: ${totalRestaurantOrders}`}
        iconName="run"
      />
      <SummaryField
        text={`Total takeaway orders: ${totalTakeawayOrders}`}
        iconName="package-variant"
      />
      <SummaryField
        text={`Total takeaway cost: ${totalTakeawayCost}`}
        iconName="currency-usd"
      />
      <SummaryField text={`Total cost: ${totalCost}`} iconName="currency-usd" />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#FFF1CA',
  },
});

export default Statistics;
