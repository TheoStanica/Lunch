import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminScreen from '../../screens/adminScreens/adminScreen';
import ManageUsersScreen from '../../screens/adminScreens/manageUsersScreen';
import ManageRestaurantsScreen from '../../screens/adminScreens/manageRestaurantsScreen';
import UserDetailsScreen from '../../screens/adminScreens/userDetailsScreen';
import RestaurantDetailsScreen from '../../screens/adminScreens/restaurantDetailsScreen';
import CreateRestaurantScreen from '../../screens/adminScreens/createRestaurantScreen';
import MessageScreen from '../../screens/messageScreen';
import ManageOrdersScreen from '../../screens/adminScreens/manageOrdersScreen';
import MenuAdminDetailsScreen from '../../screens/adminScreens/menuAdminDetailsScreen';
import ManageMenusScreen from '../../screens/adminScreens/manageMenusScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerBackTitle: '',
  headerTintColor: 'black',
};

const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
        headerStyle: {backgroundColor: '#FFF1CA'},
      }}>
      <Stack.Screen
        name="AdminScreen"
        component={AdminScreen}
        options={{title: 'Admin', headerShown: false}}
      />
      <Stack.Screen
        name="MenuAdminDetailsScreen"
        component={MenuAdminDetailsScreen}
        options={{
          title: 'Menu Details',
        }}
      />
      <Stack.Screen
        name="ManageUsersScreen"
        component={ManageUsersScreen}
        options={{
          title: 'Manage Users',
        }}
      />
      <Stack.Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
        options={{
          title: 'Update User',
        }}
      />
      <Stack.Screen
        name="ManageMenusScreen"
        component={ManageMenusScreen}
        options={{
          title: 'Manage Menus',
        }}
      />
      <Stack.Screen
        name="ManageOrdersScreen"
        component={ManageOrdersScreen}
        options={{
          title: 'Manage Orders',
        }}
      />
      <Stack.Screen
        name="ManageRestaurantsScreen"
        component={ManageRestaurantsScreen}
        options={{
          title: 'Manage Restaurants',
        }}
      />
      <Stack.Screen
        name="RestaurantDetailsScreen"
        component={RestaurantDetailsScreen}
        options={{
          title: 'Restaurant Details',
        }}
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

export default AdminStack;
