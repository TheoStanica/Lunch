import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderStatisticsScreen from '../../screens/adminScreens/ordersStatisticsScreen';
import OrderDetailsTab from '../tabNavigationRoutes/orderDetailsTab';

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
          title: 'Order Details Tab',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStack;
