import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MenuDetailsAdminScreen from '../../screens/adminScreens/menuDetailsAdminScreen';
import MenuOrdersAdminScreen from '../../screens/adminScreens/menuOrdersAdminScreen';

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
      initialRouteName="MenuDetailsAdminScreen">
      <Tab.Screen
        name="MenuDetailsAdminScreen"
        component={MenuDetailsAdminScreen}
        initialParams={{menu: route.params.menu}}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Menu Summary',
        }}
      />
      <Tab.Screen
        name="MenuOrdersAdminScreen"
        component={MenuOrdersAdminScreen}
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
