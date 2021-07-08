import 'react-native-gesture-handler';
import React from 'react';
import {store, persistor} from './src/redux/store';
import AppNavigatorRoutes from './src/navigation/stackNavigationRoutes';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import LoadingScreen from './src/screens/loadingScreen';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <NavigationContainer>
          <AppNavigatorRoutes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
