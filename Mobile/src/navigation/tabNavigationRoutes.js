import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/homeScreen';

const Tab = createBottomTabNavigator();

const TabNavigatorRoutes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="TestScreen" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigatorRoutes;
