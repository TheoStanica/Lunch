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
import messaging from '@react-native-firebase/messaging';
import {Linking, Platform} from 'react-native';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FBBC00',
    accent: '#FBBC00',
  },
};

const App = () => {
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
            path: 'admin',
            initialRouteName: 'AdminScreen',
            screens: {
              AdminScreen: '/',
              MenuDetailsTab: 'menu/:menuId',
            },
          },
        },
      },
    },
  };
  const linking = {
    prefixes: ['lunchapp://'],
    config,
    async getInitialURL() {
      try {
        const url = await Linking.getInitialURL();

        if (url != null) {
          return url;
        }
        const message = await messaging().getInitialNotification();

        return message?.data?.url;
      } catch (error) {}
    },
    subscribe(listener) {
      try {
        let unsubscribeNotification;

        if (Platform.OS === 'android') {
          const onReceiveURL = ({url}) => listener(url);
          Linking.addEventListener('url', onReceiveURL);

          unsubscribeNotification = messaging().onNotificationOpenedApp(
            message => {
              const url = message?.data?.url;
              if (url) {
                listener(url);
              }
            },
          );
        }

        return () => {
          if (Platform.OS === 'android') {
            Linking.removeEventListener('url', onReceiveURL);
            unsubscribeNotification();
          }
        };
      } catch (error) {}
    },
  };

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
