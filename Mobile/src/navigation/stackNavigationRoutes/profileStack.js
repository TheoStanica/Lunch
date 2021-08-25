import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/userScreens/profileScreen';
import UpdateProfileScreen from '../../screens/userScreens/updateProfileScreen';
import MessageScreen from '../../screens/messageScreen';

const Stack = createStackNavigator();

const ProfileStack = () => {
  const screenOptions = {
    headerBackTitle: '',
    headerTintColor: 'black',
  };

  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{
          title: 'Update Profile',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          title: '',
          headerLeft: null,
          headerStyle: {backgroundColor: '#FCBB00'},
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
