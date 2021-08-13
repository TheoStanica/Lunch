import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderStatisticsScreen from '../../screens/adminScreens/ordersStatisticsScreen';
import OrderDetailsTab from '../tabNavigationRoutes/orderDetailsTab';
import ManagePdfScreen from '../../screens/adminScreens/managePdfScreen';

const Stack = createStackNavigator();

const OrdersStack = () => {
  const screenOptions = {
    headerBackTitle: '',
    headerTintColor: 'black',
  };

  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="OrderStatisticsScreen"
        component={OrderStatisticsScreen}
        options={{
          title: 'Orders Statistics',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="OrderDetailsTab"
        component={OrderDetailsTab}
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
