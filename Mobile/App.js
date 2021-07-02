import 'react-native-gesture-handler';
import React from 'react';
import store from './src/redux/store';
import AppNavigatorRoutes from './src/navigation/stackNavigationRoutes';

import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigatorRoutes />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
