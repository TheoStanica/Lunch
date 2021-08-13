import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrdersStatisticsScreen from '../../screens/adminScreens/ordersStatisticsScreen';
import ManagePdfScreen from '../../screens/adminScreens/managePdfScreen';
import OrderDetailsTab from '../tabNavigationRoutes/orderDetailsTab';
import UserRestaurantOrdersScreen from '../../screens/adminScreens/userRestaurantOrdersScreen';

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
        name="OrderDetailsTab"
        component={OrderDetailsTab}
        options={{
          title: 'Order Statistics',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="UserRestaurantOrdersScreen"
        component={UserRestaurantOrdersScreen}
        options={{
          title: 'User Orders',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="ManagePdfScreen"
        component={ManagePdfScreen}
        options={{
          title: 'PDF Statistics',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStack;
