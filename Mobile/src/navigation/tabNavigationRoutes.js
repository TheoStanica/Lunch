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
import MenuDetailsScreen from '../screens/userScreens/menuDetailsScreen';
import MessageScreen from '../screens/messageScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import MenuTakeawayOrderScreen from '../screens/userScreens/menuTakeawayOrderScreen';
import CreateMenuScreen from '../screens/adminScreens/createMenuScreen';

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
        options={{
          title: 'Update Profile',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
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
        options={{
          title: 'Manage Restaurants',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="RestaurantDetailsScreen"
        component={RestaurantDetailsScreen}
        options={{
          title: 'Restaurant Details',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="CreateRestaurantScreen"
        component={CreateRestaurantScreen}
        options={{
          title: 'Create Restaurant',
          detachPreviousScreen: true,
          detachInactiveScreens: true,
          headerStyle: {backgroundColor: '#FFF1CA'},
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

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home', headerShown: false}}
      />
      <Stack.Screen
        name="MenuDetailsScreen"
        component={MenuDetailsScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="MenuTakeawayOrderScreen"
        component={MenuTakeawayOrderScreen}
        options={{title: 'Order'}}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{title: '', headerStyle: {backgroundColor: '#FCBB00'}}}
      />
      <Stack.Screen
        name="CreateMenuScreen"
        component={CreateMenuScreen}
        options={{
          title: 'Create Menu',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
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
        name="HomeStack"
        component={HomeStack}
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
            <Icon name="account" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorRoutes;
