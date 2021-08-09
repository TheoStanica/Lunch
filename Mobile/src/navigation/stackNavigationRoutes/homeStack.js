import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../screens/userScreens/homeScreen';
import MenuDetailsScreen from '../../screens/userScreens/menuDetailsScreen';
import MessageScreen from '../../screens/messageScreen';
import MenuTakeawayOrderScreen from '../../screens/userScreens/menuTakeawayOrderScreen';
import CreateMenuScreen from '../../screens/adminScreens/createMenuScreen';
import UsersGoingScreen from '../../screens/userScreens/usersGoingScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  const screenOptions = {
    headerBackTitle: '',
    headerTintColor: 'black',
  };

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
      <Stack.Screen
        name="UsersGoingScreen"
        component={UsersGoingScreen}
        options={{
          title: 'Users Going',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
