import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PdfScreen from '../../screens/adminScreens/pdfScreen';
import ManagePdfScreen from '../../screens/adminScreens/managePdfScreen';

const Stack = createStackNavigator();

const PdfStack = () => {
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
        name="ManagePdfScreen"
        component={ManagePdfScreen}
        options={{title: 'Reports'}}
      />
      <Stack.Screen
        name="PdfScreen"
        component={PdfScreen}
        options={{
          title: 'PDF',
        }}
      />
    </Stack.Navigator>
  );
};

export default PdfStack;
