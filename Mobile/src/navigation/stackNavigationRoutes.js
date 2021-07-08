import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import TabNavigatorRoutes from './tabNavigationRoutes';
import {useSelector} from 'react-redux';
import AuthScreen from '../screens/authScreen';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName="AuthScreen">
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
          title: 'Auth',
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{title: 'Register'}}
      />
    </Stack.Navigator>
  );
};

const AppNavigatorRoutes = () => {
  const {accessToken} = useSelector(state => state.userReducer);

  return !accessToken ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigatorRoutes"
        component={TabNavigatorRoutes}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigatorRoutes;
