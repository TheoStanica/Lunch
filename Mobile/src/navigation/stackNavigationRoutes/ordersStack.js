import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrdersStatisticsScreen from '../../screens/adminScreens/ordersStatisticsScreen';
import ManagePdfScreen from '../../screens/adminScreens/managePdfScreen';
import OrdersStatisticsStack from './ordersStatisticsStack';

const Stack = createStackNavigator();

const OrdersStack = () => {
  const screenOptions = {
    headerBackTitle: '',
    headerTintColor: 'black',
  };

  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="OrdersStatisticsScreen"
        component={OrdersStatisticsScreen}
        options={{
          title: 'Orders Statistics',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="OrdersStatisticsStack"
        component={OrdersStatisticsStack}
        options={{
          title: 'Order Statistics',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="ManagePdfScreen"
        component={ManagePdfScreen}
        options={{
          title: 'PDF',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStack;
