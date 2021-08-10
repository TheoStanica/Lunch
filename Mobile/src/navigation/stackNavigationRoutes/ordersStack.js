import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserRestaurantOrdersScreen from '../../screens/adminScreens/userRestaurantOrdersScreen';
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
        name="OrderDetailsTab"
        component={OrderDetailsTab}
        options={{
          title: 'Manage Orders',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="UserRestaurantOrdersScreen"
        component={UserRestaurantOrdersScreen}
        options={{
          title: 'User Restaurant Orders',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStack;
