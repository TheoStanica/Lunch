import 'react-native-gesture-handler';
import React from 'react';
import {store, persistor} from './src/redux/store';
import AppNavigatorRoutes from './src/navigation/stackNavigationRoutes';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingScreen from './src/screens/loadingScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import DisplayErrors from './src/components/displayErrors';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FBBC00',
  },
};

const config = {
  screens: {
    Auth: {
      screens: {
        ForgotPasswordScreen: 'forgotpassword/:_token',
        ActivationScreen: 'activate/:_activationToken',
      },
    },
  },
};
const linking = {
  prefixes: ['lunchapp://'],
  config,
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <PaperProvider theme={theme}>
          <NavigationContainer linking={linking} fallback={<LoadingScreen />}>
            <AppNavigatorRoutes />
            <DisplayErrors />
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
