import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderDetailsTab from '../tabNavigationRoutes/orderDetailsTab';
import UserRestaurantOrdersScreen from '../../screens/adminScreens/userRestaurantOrdersScreen';

const Stack = createStackNavigator();

const OrdersStatisticsStack = ({route}) => {
  const screenOptions = {
    headerBackTitle: '',
    headerTintColor: 'black',
  };

  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="OrderDetailsTab"
        component={OrderDetailsTab}
        initialParams={{statistics: route.params.statistics}}
        options={{
          title: 'Order Statistics',
          headerShown: false,
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
    </Stack.Navigator>
  );
};

export default OrdersStatisticsStack;
