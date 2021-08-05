import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MenuAdminDetailsScreen from '../../screens/adminScreens/menuAdminDetailsScreen';
import MenuOrders from '../../screens/adminScreens/menuOrders';

const Tab = createMaterialTopTabNavigator();

const MenuDetailsTab = ({route}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {backgroundColor: '#4A6572'},
        style: {backgroundColor: '#4A6572'},
        inactiveTintColor: 'white',
        activeTintColor: '#FBBC00',
      }}
      screenOptions={{unmountOnBlur: true}}
      initialRouteName="MenuAdminDetailsScreen">
      <Tab.Screen
        name="MenuAdminDetailsScreen"
        component={MenuAdminDetailsScreen}
        initialParams={{menu: route.params.menu}}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Menu Summary',
        }}
      />
      <Tab.Screen
        name="MenuOrders"
        component={MenuOrders}
        initialParams={{menu: route.params.menu}}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'User Orders',
        }}
      />
    </Tab.Navigator>
  );
};

export default MenuDetailsTab;
