import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import AuthStack from './authStack';
import AppTab from '../tabNavigationRoutes/appTab';

const Stack = createStackNavigator();

const AppStack = () => {
  const {accessToken} = useSelector(state => state.userReducer);

  return !accessToken ? (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="AppTab"
        component={AppTab}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
