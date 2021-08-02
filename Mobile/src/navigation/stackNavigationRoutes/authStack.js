import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/authScreens/loginScreen';
import RegisterScreen from '../../screens/authScreens/registerScreen';
import ForgotPasswordScreen from '../../screens/authScreens/forgotPasswordScreen';
import AuthScreen from '../../screens/authScreens/authScreen';
import MessageScreen from '../../screens/messageScreen';
import ActivationScreen from '../../screens/authScreens/activationScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
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

export default AuthStack;
