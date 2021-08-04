import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MenuAdminDetailsScreen from '../../screens/adminScreens/menuAdminDetailsScreen';
import MenuOrders from '../../screens/adminScreens/menuOrders';

const Tab = createMaterialTopTabNavigator();

const MenuDetailsTab = ({route}) => {
  return (
    <Tab.Navigator initialRouteName="MenuAdminDetailsScreen">
      <Tab.Screen
        name="MenuAdminDetailsScreen"
        component={MenuAdminDetailsScreen}
        initialParams={{menu: route.params.menu}}
      />
      <Tab.Screen name="MenuOrders" component={MenuOrders} />
    </Tab.Navigator>
  );
};

export default MenuDetailsTab;
