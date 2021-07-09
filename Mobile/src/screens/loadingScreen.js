import React from 'react';
import {StyleSheet, StatusBar, View, Platform} from 'react-native';
import {withTheme} from 'react-native-paper';
import LunchLogo from '../assets/images/Lunch';

const LoadingScreen = ({theme}) => {
  return (
    <View style={styles.container}>
      {Platform.OS !== 'ios' ? (
        <StatusBar backgroundColor={theme.colors.primary} />
      ) : null}
      <LunchLogo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBBC00',
  },
});

export default withTheme(LoadingScreen);
