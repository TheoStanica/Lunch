import React, {useEffect, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  StatusBar,
} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import LunchLogo from '../../assets/images/Lunch';
import useAuthScreenAnimation from '../../hooks/useAuthScreenAnimation';

const AuthScreen = ({navigation, theme}) => {
  const {animate, fadeIn, translateY, translateLogo} = useAuthScreenAnimation();

  useEffect(() => {
    setTimeout(() => {
      animate();
    }, 500);
  }, []);

  return (
    <View style={styles.container(theme)}>
      {Platform.OS !== 'ios' ? (
        <StatusBar backgroundColor={theme.colors.primary} />
      ) : null}
      <View style={styles.logoContainer}>
        <Animated.View style={styles.translateLogo(translateLogo)}>
          <LunchLogo />
        </Animated.View>
      </View>
      <SafeAreaView style={styles.buttonContainer}>
        <Animated.View style={styles.animateButtons(fadeIn, translateY)}>
          <Button
            style={styles.glassButton}
            mode="contained"
            color="#fff7"
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Login</Text>
          </Button>
          <Button onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.buttonText}>Create an account</Text>
          </Button>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: theme => ({
    flex: 1,
    backgroundColor: theme.colors.primary,
  }),
  logoContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 25,
    right: 25,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 40,
  },
  glassButton: {
    marginBottom: 8,
    shadowColor: 'transparent',
  },
  translateLogo: logo => ({
    transform: [{translateY: logo}],
  }),
  animateButtons: (fade, translate) => ({
    transform: [{translateY: translate}],
    opacity: fade,
  }),
});

export default withTheme(AuthScreen);
