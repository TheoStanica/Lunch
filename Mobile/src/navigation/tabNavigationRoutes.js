import React from 'react';
import HomeScreen from '../screens/userScreens/homeScreen';
import ProfileScreen from '../screens/userScreens/profileScreen';
import UpdateProfileScreen from '../screens/userScreens/updateProfileScreen';
import AdminScreen from '../screens/adminScreens/adminScreen';
import ManageUsersScreen from '../screens/adminScreens/manageUsersScreen';
import ManageRestaurantsScreen from '../screens/adminScreens/manageRestaurantsScreen';
import UserDetailsScreen from '../screens/adminScreens/userDetailsScreen';
import RestaurantDetailsScreen from '../screens/adminScreens/restaurantDetailsScreen';
import CreateRestaurantScreen from '../screens/adminScreens/createRestaurantScreen';
import MessageScreen from '../screens/messageScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  headerBackTitle: '',
  headerTintColor: 'black',
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
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

const AdminStack = () => {
  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{title: 'Admin', headerShown: false}}
      />
      <Stack.Screen
        name="ManageUsersScreen"
        component={ManageUsersScreen}
        options={{title: 'Manage Users'}}
      />
      <Stack.Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
        options={{title: 'Update User'}}
      />
      <Stack.Screen
        name="ManageRestaurantsScreen"
        component={ManageRestaurantsScreen}
        options={{title: 'Manage Restaurants'}}
      />
      <Stack.Screen
        name="RestaurantDetailsScreen"
        component={RestaurantDetailsScreen}
        options={{title: 'Restaurant Details'}}
      />
      <Stack.Screen
        name="CreateRestaurantScreen"
        component={CreateRestaurantScreen}
        options={{
          title: 'Create Restaurant',
          detachPreviousScreen: true,
          detachInactiveScreens: true,
        }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{title: '', headerStyle: {backgroundColor: '#FCBB00'}}}
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
      }}
      screenOptions={{unmountOnBlur: true}}>
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
          name="AdminStack"
          component={AdminStack}
          options={{
            unmountOnBlur: true,
            tabBarLabel: 'Admin',
            tabBarIcon: ({color}) => (
              <Icon name="shield-account" size={25} color={color} />
            ),
          }}
        />
      ) : (
        <></>
      )}
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="card-account-details-outline" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorRoutes;
