import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import ForgotPasswordScreen from '../screens/forgotPasswordScreen';
import TabNavigatorRoutes from './tabNavigationRoutes';
import {useSelector} from 'react-redux';
import AuthScreen from '../screens/authScreen';
import MessageScreen from '../screens/messageScreen';
import ActivationScreen from '../screens/activationScreen';

const Stack = createStackNavigator();

const Auth = () => {
  const authScreensOptions = {
    headerBackTitle: '',
    headerStyle: {backgroundColor: '#FBBC00'},
    headerTintColor: 'black',
  };

  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{...authScreensOptions}}>
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{headerShown: false, title: 'Auth'}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'Login'}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{title: 'Forgot Password'}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{title: 'Register'}}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="ActivationScreen"
        component={ActivationScreen}
        options={{title: ''}}
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
