import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Animated, StyleSheet, Image, Platform, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HEADER_HEIGHT = 220;

const AnimatedHeader = ({
  animatedValue,
  title,
  description,
  textContainerColor = '#4A6572',
  descriptionStyle = {},
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const titleRef = useRef(null);

  const [headerHeight, setHeaderHeight] = useState(
    animatedValue.interpolate({
      inputRange: [0, HEADER_HEIGHT + insets.top],
      outputRange: [HEADER_HEIGHT, insets.top],
      extrapolate: 'clamp',
    }),
  );

  const titleBackground = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT - 50, HEADER_HEIGHT],
    outputRange: [textContainerColor, textContainerColor, '#FFF1CA'],
    extrapolate: 'clamp',
  });
  const textColor = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT - 50, HEADER_HEIGHT],
    outputRange: ['white', 'white', 'black'],
    extrapolate: 'clamp',
  });
  const minWidth = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: '#FFF1CA', shadowColor: 'transparent'},
    });
  }, []);

  useEffect(() => {
    if (title) {
      titleRef.current.measure((x, y, width, height, px, py) =>
        setHeaderHeight(
          animatedValue.interpolate({
            inputRange: [0, HEADER_HEIGHT + insets.top],
            outputRange: [HEADER_HEIGHT, insets.top + height ? height : 0],
            extrapolate: 'clamp',
          }),
        ),
      );
    }
  }, [titleRef, insets.top]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        height: headerHeight,
      }}>
      <StatusBar backgroundColor="#FFF1CA" barStyle="dark-content" />
      <Image
        source={require('../assets/images/eating.png')}
        style={styles.image}
        resizeMode={Platform.OS === 'ios' ? 'contain' : 'center'}
      />
      {title ? (
        <Animated.View
          style={[styles.titleContainer, {backgroundColor: titleBackground}]}
          ref={titleRef}>
          <Animated.Text
            numberOfLines={1}
            style={[
              styles.title,
              {
                textAlign: 'center',
                minWidth: minWidth,
                color: textColor,
                alignSelf: 'flex-start',
              },
            ]}>
            {title}
          </Animated.Text>
          {description ? (
            <Animated.Text
              style={[
                {
                  textAlign: 'center',
                  minWidth: minWidth,
                  color: textColor,
                  alignSelf: 'flex-start',
                },
                descriptionStyle,
              ]}>
              {description}
            </Animated.Text>
          ) : null}
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF1CA',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
  },
});

export default AnimatedHeader;
