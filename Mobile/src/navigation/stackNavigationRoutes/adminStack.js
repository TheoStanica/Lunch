import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminScreen from '../../screens/adminScreens/adminScreen';
import ManageUsersScreen from '../../screens/adminScreens/manageUsersScreen';
import ManageRestaurantsScreen from '../../screens/adminScreens/manageRestaurantsScreen';
import UserDetailsScreen from '../../screens/adminScreens/userDetailsScreen';
import RestaurantDetailsScreen from '../../screens/adminScreens/restaurantDetailsScreen';
import CreateRestaurantScreen from '../../screens/adminScreens/createRestaurantScreen';
import MessageScreen from '../../screens/messageScreen';
import ManageMenusScreen from '../../screens/adminScreens/manageMenusScreen';
import MenuDetailsTab from '../tabNavigationRoutes/menuDetailsTab';
import OrdersStack from './ordersStack';
import PdfStack from './pdfStack';

const Stack = createStackNavigator();

const AdminStack = () => {
  const screenOptions = {
    headerBackTitle: '',
    headerTintColor: 'black',
  };

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
        name="MenuDetailsTab"
        component={MenuDetailsTab}
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
        name="OrdersStack"
        component={OrdersStack}
        options={{
          title: 'Manage Orders',
          headerShown: false,
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
        name="PdfStack"
        component={PdfStack}
        options={{
          title: 'Reports',
          headerShown: false,
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
