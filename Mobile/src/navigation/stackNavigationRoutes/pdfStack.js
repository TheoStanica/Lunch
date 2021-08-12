import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreatePdfScreen from '../../screens/adminScreens/createPdfScreen';
import ManagePdfScreen from '../../screens/adminScreens/managePdfScreen';

const Stack = createStackNavigator();

const PdfStack = () => {
  const screenOptions = {
    headerBackTitle: '',
    headerTintColor: 'black',
  };

  return (
    <Stack.Navigator screenOptions={{...screenOptions}}>
      <Stack.Screen
        name="ManagePdfScreen"
        component={ManagePdfScreen}
        options={{title: 'Manage PDF', headerShown: false}}
      />
      <Stack.Screen
        name="CreatePdfScreen"
        component={CreatePdfScreen}
        options={{
          title: 'Create PDF',
          headerStyle: {backgroundColor: '#FFF1CA'},
        }}
      />
    </Stack.Navigator>
  );
};

export default PdfStack;
