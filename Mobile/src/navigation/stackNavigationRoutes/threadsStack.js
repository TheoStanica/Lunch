import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateThreadScreen from '../../screens/threadScreens/createThreadScreen';
import ThreadsScreen from '../../screens/threadScreens/threadsScreen';

const Stack = createStackNavigator();

const ThreadsStack = () => {
  const screenOptions = {
    headerBackTitle: '',
    headerTintColor: 'black',
  };

  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="ThreadsScreen"
        component={ThreadsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateThreadScreen"
        component={CreateThreadScreen}
        options={{
          title: 'Create Thread',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
    </Stack.Navigator>
  );
};

export default ThreadsStack;
