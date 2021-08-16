import 'react-native-gesture-handler';
import React from 'react';
import {store, persistor} from './src/redux/store';
import AppStack from './src/navigation/stackNavigationRoutes/appStack';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingScreen from './src/screens/loadingScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import DisplayErrors from './src/components/displayErrors';
import NotificationProvider from './src/components/notificationProvider';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FBBC00',
    accent: '#FBBC00',
  },
};

const config = {
  screens: {
    AuthStack: {
      screens: {
        ForgotPasswordScreen: 'forgotpassword/:_token',
        ActivationScreen: 'activate/:_activationToken',
      },
    },
    AppTab: {
      screens: {
        AdminStack: {
          screens: {
            AdminScreen: 'admin',
          },
        },
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
            <NotificationProvider>
              <AppStack />
              <DisplayErrors />
            </NotificationProvider>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
