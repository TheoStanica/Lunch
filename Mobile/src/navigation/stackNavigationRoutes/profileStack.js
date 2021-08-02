import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../../screens/userScreens/profileScreen';
import UpdateProfileScreen from '../../screens/userScreens/updateProfileScreen';

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

export default ProfileStack;
