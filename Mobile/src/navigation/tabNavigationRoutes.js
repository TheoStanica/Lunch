import React from 'react';
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import UpdateProfileScreen from '../screens/updateProfileScreen';
import AdminScreen from '../screens/adminScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{title: 'Profile', headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{title: 'Update Profile'}}
      />
    </Stack.Navigator>
  );
};

const TabNavigatorRoutes = () => {
  const userReducer = useSelector(state => state.userReducer);

  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: {backgroundColor: '#4A6572'},
        style: {backgroundColor: '#4A6572'},
        inactiveTintColor: 'white',
        activeTintColor: '#FBBC00',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
        }}
      />
      {userReducer.role === 'admin' ? (
        <Tab.Screen
          name="AdminScreen"
          component={AdminScreen}
          options={{
            tabBarLabel: 'Admin',
            tabBarIcon: ({color}) => (
              <Icon name="account" size={25} color={color} />
            ),
          }}
        />
      ) : (
        <></>
      )}
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="account" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorRoutes;
