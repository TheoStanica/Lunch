import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ManageRestaurantOrdersScreen from '../../screens/adminScreens/manageRestaurantOrdersScreen';
import ManageOrdersScreen from '../../screens/adminScreens/manageOrdersScreen';

const Tab = createMaterialTopTabNavigator();

const OrderDetailsTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {backgroundColor: '#4A6572'},
        style: {backgroundColor: '#4A6572'},
        inactiveTintColor: 'white',
        activeTintColor: '#FBBC00',
      }}
      screenOptions={{unmountOnBlur: true}}
      sceneContainerStyle={{backgroundColor: '#FFF1CA'}}
      initialRouteName="ManageOrdersScreen">
      <Tab.Screen
        name="ManageOrdersScreen"
        component={ManageOrdersScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'User Orders',
        }}
      />
      <Tab.Screen
        name="ManageRestaurantOrdersScreen"
        component={ManageRestaurantOrdersScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Restaurant Orders',
        }}
      />
    </Tab.Navigator>
  );
};

export default OrderDetailsTab;
