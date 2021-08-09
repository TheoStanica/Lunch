import React, {useRef, useCallback} from 'react';
import {Animated} from 'react-native';

const useAuthScreenAnimation = () => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(150)).current;
  const translateLogo = useRef(new Animated.Value(0)).current;

  const animate = useCallback(() => {
    Animated.timing(translateLogo, {
      toValue: -100,
      duration: 700,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(translateY, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, []);

  return {animate, fadeIn, translateY, translateLogo};
};

export default useAuthScreenAnimation;
